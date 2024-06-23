// See https://kit.svelte.dev/docs/types#app

import type { PermissionsBitField } from "discord.js"

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	declare type discordOauthUser = {
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
	declare type discordOauthGuild = {
		perms_array: PermissionsString[];
		id: string,
		name: string,
		icon: string,
		owner: true,
		permissions: number,
		permissions_new: number,
		features: string[]
	}
	declare type PermissionsString = "CreateInstantInvite" | "KickMembers" | "BanMembers" | "Administrator" | "ManageChannels" | "ManageGuild" | "AddReactions" | "ViewAuditLog" | "PrioritySpeaker" | "Stream" | "ViewChannel" | "SendMessages" | "SendTTSMessages" | "ManageMessages" | "EmbedLinks" | "AttachFiles" | "ReadMessageHistory" | "MentionEveryone" | "UseExternalEmojis" | "ViewGuildInsights" | "Connect" | "Speak" | "MuteMembers" | "DeafenMembers" | "MoveMembers" | "UseVAD" | "ChangeNickname" | "ManageNicknames" | "ManageRoles" | "ManageWebhooks" | "ManageEmojisAndStickers" | "ManageGuildExpressions" | "UseApplicationCommands" | "RequestToSpeak" | "ManageEvents" | "ManageThreads" | "CreatePublicThreads" | "CreatePrivateThreads" | "UseExternalStickers" | "SendMessagesInThreads" | "UseEmbeddedActivities" | "ModerateMembers" | "ViewCreatorMonetizationAnalytics" | "UseSoundboard" | "CreateGuildExpressions" | "CreateEvents" | "UseExternalSounds" | "SendVoiceMessages" | "SendPolls"
	declare type JSONGuild = {
		"id": string,
		"name": string,
		"icon": string,
		"features": string[],
		"commands": [],
		"members": string[],
		"channels": string[],
		"bans": string[],
		"roles": string[],
		"stageInstances": [],
		"invites": [],
		"scheduledEvents": [],
		"autoModerationRules": [],
		"shardId": number,
		"splash": null,
		"banner": null,
		"description": null,
		"verificationLevel": number,
		"vanityURLCode": null,
		"nsfwLevel": number,
		"premiumSubscriptionCount": number,
		"discoverySplash": null,
		"memberCount": number,
		"large": boolean,
		"premiumProgressBarEnabled": boolean,
		"applicationId": null,
		"afkTimeout": number,
		"afkChannelId": null,
		"systemChannelId": string,
		"premiumTier": number,
		"widgetEnabled": null,
		"widgetChannelId": null,
		"explicitContentFilter": number,
		"mfaLevel": number,
		"joinedTimestamp": number,
		"defaultMessageNotifications": number,
		"systemChannelFlags": number,
		"maximumMembers": number,
		"maximumPresences": null,
		"maxVideoChannelUsers": number,
		"maxStageVideoChannelUsers": number,
		"approximateMemberCount": null,
		"approximatePresenceCount": null,
		"vanityURLUses": null,
		"rulesChannelId": null,
		"publicUpdatesChannelId": null,
		"preferredLocale": string,
		"safetyAlertsChannelId": null,
		"ownerId": string,
		"emojis": string[],
		"stickers": string[],
		"createdTimestamp": string,
		"nameAcronym": string,
		"iconURL": string,
		"splashURL": string,
		"discoverySplashURL": string,
		"bannerURL": string
	}
}

export { };
