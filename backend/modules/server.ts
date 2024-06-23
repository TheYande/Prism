import express from 'express';
import { client } from 'strife.js';
import cors from "cors"
import type { discordOauthGuild, discordOauthUser } from '../util/discord.js';
import { PermissionsBitField } from 'discord.js';
const app = express();
const port = 3000;
import { activatedComponents, serverConfig } from './serverConfig/index.js';



app.use(cors());
app.use(express.json());
app.get('/api', (_req, res) => {

    res.json({
        isReady: client.isReady(),
        username: client.user.username,
        uptime: Date.now() - client.readyTimestamp,
        readyTimestamp: client.readyTimestamp
    });
});

let discordUsers: { [code: string]: discordOauthUser } = {}

app.get("/verifyCode", async (req, res) => {
    const { code } = req.query
    if (typeof code !== "string") return res.json()
    const tokenResponseData = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams({
            client_id: client.application.id,
            client_secret: process.env.CLIENT_SECRET || "",
            code,
            grant_type: 'authorization_code',
            redirect_uri: `http://localhost:5173/login`,
            scope: 'identify',
        }).toString(),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    const tokenData = await tokenResponseData.json() as {
        error: string,
        error_description: string
    } | {
        "token_type": string,
        "access_token": string,
        "expires_in": number,
        "refresh_token": string,
        "scope": string
    }
    let user = null
    let token = null
    let guilds = null
    if (!("error" in tokenData)) {
        user = await fetch('https://discord.com/api/users/@me', {
            headers: {
                authorization: `${tokenData.token_type} ${tokenData.access_token}`,
            },
        }).then(a => a.json()) as discordOauthUser
        guilds = await fetch('https://discord.com/api/users/@me/guilds', {
            headers: {
                authorization: `${tokenData.token_type} ${tokenData.access_token}`,
            },
        }).then(a => a.json()) as discordOauthGuild[]
        user.guilds = guilds.map((g) => {
            g.perms_array = new PermissionsBitField(BigInt(g.permissions_new)).toArray()
            return g
        })
        console.log(guilds)
        token = randomString(256);
        discordUsers[token] = user
    }
    res.json({ user, token })
})

app.get('/users/:token', (req, res) => {
    const token = req.params.token
    if (typeof token != "string") return res.json({ message: "nothin here" })
    res.json(discordUsers[token] || { message: "nothin here" })
})

app.get('/servers/:serverid/plugins/', async (req, res) => {
    const serverid = req.params.serverid;
    const { auth } = req.query
    if ((typeof auth != "string")) return unauthorized(res)
    const user = discordUsers[auth]
    if (!user) return res.json(`No user matches this auth code ${auth}`);
    if (!user.guilds.some((g) => `${g.id}` == serverid)) unauthorized(res)
    res.json({ active: await activatedComponents.getData(serverid) });
});

app.post('/servers/:serverid/plugins/:name', async (req, res) => {
    const serverid = req.params.serverid;
    const name = req.params.name;
    const { auth } = req.query
    if ((typeof auth != "string")) return unauthorized(res)
    const user = discordUsers[auth]
    if (!user) return res.json(`No user matches this auth code ${auth}`);
    if (!user.guilds.some((g) => `${g.id}` == serverid)) unauthorized(res)
    let active = await activatedComponents.getData(serverid) ?? []

    if (active.includes(name) != (req.body["state"] == "on"))
        if (active.includes(name)) active = active.filter((a) => a != name)
        else
            active.push(name)


    await activatedComponents.setData(serverid, active)
    res.json({ status: "sucess" })
})

app.get('/servers/:serverid/plugins/logging/settings', async (req, res) => {
    const serverid = req.params.serverid;
    const { auth } = req.query
    if ((typeof auth != "string")) return unauthorized(res)
    const user = discordUsers[auth]
    if (!user) return res.json(`No user matches this auth code ${auth}`);
    if (!user.guilds.some((g) => `${g.id}` == serverid)) unauthorized(res)
    const config = await serverConfig.getData(serverid)
    const server = await client.guilds.fetch(serverid)
    const channels = [...server.channels.valueOf().values()].filter((c)=> c.isTextBased()).map((c) => ({ name: c.name, id: c.id }))
    res.json({ channel: config?.channels?.logging, all: channels })
})


app.get('/servers/:serverid', async (req, res) => {
    const serverid = req.params.serverid;
    const { auth } = req.query
    if ((typeof auth != "string")) return unauthorized(res)
    const user = discordUsers[auth]
    if (!user) return res.json(`No user matches this auth code`);
    if (!user.guilds.some((g) => `${g.id}` == serverid)) return unauthorized(res)
    const guild = await client.guilds.fetch(serverid).catch(() => ({ toJSON: () => ({ code: 404 }) }))
    res.json(guild.toJSON())
});

app.listen(port, () => {
    console.log(`Node.js app listening at http://localhost:${port}`);
});

function randomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
import type { Response } from 'express';
function unauthorized(res: Response) {
    return res.status(401).json({ message: "Unauthorized" });
}