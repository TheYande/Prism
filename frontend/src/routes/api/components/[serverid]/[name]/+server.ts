import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, cookies, fetch, url }) => {

    return json({
        res: await fetch(`http://localhost:3000/servers/${params.serverid}/plugins/${params.name}?auth=${cookies.get("identity")}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
              },
            body: JSON.stringify({state:url.searchParams.get("state")})
        }).then(a => a.json())
    });
};