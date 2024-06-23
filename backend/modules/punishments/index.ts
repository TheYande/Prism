import { ApplicationCommandOptionType } from "discord.js";
import { defineChatCommand } from "strife.js";
import { DB } from "../databases.js";
import { warn } from "./warn.js";

export const strikes = new DB<{
    target: string,
    count: number,
    reason: string,
    date: string,
    mod: string
}[]>("strikes")


defineChatCommand({
    name: "warn",
    description: "Warn a user",
    options: {
        user: {
            type: ApplicationCommandOptionType.User,
            required: true,
            description: "The user to target"
        },
    },
    access:false
}, async (int,opt) => {
    await int.deferReply()
    if (!int.guild) return await int.editReply("S")
    int.editReply(await warn(await int.guild.members.fetch(int.user.id),int.guild,opt.user))
} )

