import { Guild, GuildMember, User } from "discord.js";
import { serverConfig } from "..//serverConfig/index.js";

import { strikes } from "./index.js";


export async function warn(
    user: GuildMember, guild: Guild, target: GuildMember | User, count: number = 1, reason: string = "") {

    if (!guild) return "Something went wrong"
    const conf = await serverConfig.getData(guild.id)
    if (!conf?.roles.mods) return ("Server config doesnt have a mod role set!")
    const member = await guild.members.fetch(user.id)
    if (!member?.roles.valueOf().has(conf.roles.mods)) ("You dont have the required role to do this!")

    const str = await strikes.getData(guild.id) ?? []
    str.push({ target: target.id, count: count, reason: reason, date: Date.now().toString(), mod: member.id })
    await strikes.setData(guild.id, str)
    return `Warned ${target.toString()} `


}