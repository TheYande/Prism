import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies, fetch, url }) => {
    const code = (url.searchParams.get("code"))
    if (code) {
        const res = (await (await fetch("http://localhost:3000/verifyCode?code=" + code)).json()) as unknown as { user: discordOauthUser | null, token: string | null }
        if (res.token) cookies.set("identity", res.token, { path: "/", secure: true })
    }
    const guild_id = (url.searchParams.get("guild_id"))
    if (guild_id) return redirect(300, `/manage/${guild_id}`)
    let bot = await fetch("http://localhost:3000/api/").then(a => a.json())
    let user = await fetch("http://localhost:3000/users/" + cookies.get("identity")).then(a => a.json())
    return { bot: bot, user: user as discordOauthUser };
}) satisfies PageServerLoad;