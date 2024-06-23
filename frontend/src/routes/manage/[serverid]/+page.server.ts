import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies, fetch, params }) => {
    let user: discordOauthUser = await fetch("http://localhost:3000/users/" + cookies.get("identity")).then(a => a.json())
    if (!user.guilds?.some((g) => g.id == params.serverid)) return { code: "unauthorized" }
    let server: JSONGuild | { code: string | number } = await fetch(`http://localhost:3000/servers/${params.serverid}?auth=` + cookies.get("identity")).then(a => a.json())
    if ("code" in server && server.code == 404) return redirect(300, `https://discord.com/oauth2/authorize?client_id=1250188801599340664&scope=bot%20applications.commands&guild_id=${params.serverid}&response_type=code&redirect_uri=http://localhost:5173/`)
    return server;
}) satisfies PageServerLoad;