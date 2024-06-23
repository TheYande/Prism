import type { PageServerLoad } from './$types';

export const load = (async ({ cookies, fetch , params}) => {
    const active:{channel:string, all:{name:string, id:string }[]} = await fetch(`http://localhost:3000/servers/${params.serverid}/plugins/logging/settings?auth=${cookies.get("identity")}`).then(a => a.json())
    return {channels: active.all, current: active.channel};
}) satisfies PageServerLoad;