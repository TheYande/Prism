import type { PageServerLoad } from './$types';

export const load = (async ({fetch, cookies}) => {
    let bot = await fetch("http://localhost:3000/api/").then(a => a.json())
    let user = await fetch("http://localhost:3000/users/" + cookies.get("identity")).then(a => a.json())
    return { bot: bot, user: user as discordOauthUser };
}) satisfies PageServerLoad;