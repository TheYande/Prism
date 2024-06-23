import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch, cookies }) => {
    const active = await fetch(`http://localhost:3000/servers/${params.serverid}/plugins?auth=${cookies.get("identity")}`).then(a => a.json())
    let components = [
        { name: "Logging", path: "logs", description: "child" }, { name: "a", path: "logs", description: "child"}, 
    ].map((c) => ({...c, checked: active.active.includes(c.name.toLowerCase()), state: active.active.includes(c.name.toLowerCase())}))
    return { components, serverid: params.serverid };
}) satisfies PageServerLoad;