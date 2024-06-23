import { defineChatCommand } from "strife.js";
import { DB } from "../databases.js";
import { ApplicationCommandOptionType, roleMention } from "discord.js";

export const serverConfig = new DB<{
    roles: {
        mods: string | undefined,
        admin: string | undefined
    },
    channels:{
        logging: string | undefined
    }
}>("serverconf")

export const activatedComponents = new DB<
    string[]
>("componentsactive")

defineChatCommand({
    name: "config",
    description: "change the server configuration",
    options: {
        modrole: {
            type: ApplicationCommandOptionType.Role,
            description: "the role that mods have",
        },
        adminrole: {
            type: ApplicationCommandOptionType.Role,
            description: "the role that admins have",

        }
    },
    access: false
}, async (i, o) => {

    await i.deferReply()
    if (!i.guild) return await i.reply("this can only be used in servers")
    const config = await serverConfig.getData(i.guild.id) ?? {
        roles: {
            mods: undefined, admin: undefined
        },
        channels: {
            logging: undefined
        }
    }

    config.roles.mods ??= o.modrole?.id

    config.roles.admin ??= o.adminrole?.id
    await serverConfig.setData(i.guild.id, config)
    await i.editReply({ allowedMentions: {}, content: `roles:\n   mod:${config.roles.mods ? roleMention(config.roles.mods) : "*none*"}\n    admin:${config.roles.admin ? roleMention(config.roles.admin) : "*none*"}` })
})