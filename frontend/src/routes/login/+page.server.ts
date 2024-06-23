

export const load = async (req) => {
    const code = (req.url.searchParams.get("code"))
    const res = (await (await req.fetch("http://localhost:3000/verifyCode?code=" + code)).json()) as unknown as { user: discordOauthUser | null, token: string | null }
   if (res.token) req.cookies.set("identity",res.token,{path:"/",secure:true})
    return res;
};