import { type GuildTextBasedChannel, type ThreadChannel, type Message, type DMChannel, type PartialDMChannel, type TextBasedChannel, type Snowflake } from "discord.js";

export async function getAllMessages(
	channel: GuildTextBasedChannel | ThreadChannel,
): Promise<Message<true>[]>;
export async function getAllMessages(
	channel: DMChannel | PartialDMChannel,
): Promise<Message<false>[]>;
export async function getAllMessages(
	channel: TextBasedChannel | ThreadChannel,
): Promise<Message[]> {
	const messages = [];

	let lastId: Snowflake | undefined;

	do {
		const fetchedMessages = await channel.messages.fetch({ before: lastId, limit: 100 });

		messages.push(...fetchedMessages.values());
		lastId = fetchedMessages.lastKey();
	} while (lastId);

	return messages;
}

export type discordOauthUser = {
	"id": string,
	"username": string,
	"avatar": string,
	"discriminator": string,
	"public_flags": number,
	"flags": number,
	"banner": null | string,
	"accent_color": number | null,
	"global_name": string,
	"avatar_decoration_data": null,
	"banner_color": string | null,
	"clan": null | string,
	"mfa_enabled": false,
	"locale": string,
	"premium_type": string,
	guilds: discordOauthGuild[]
}
export type discordOauthGuild = {
    perms_array: string[];
	id: number,
	name: string,
	icon: string,
	owner: true,
	permissions: number,
	permissions_new: number,
	features: string[]
}