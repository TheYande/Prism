
import { client } from "strife.js";
import { constants } from "../global/constants.js";
import { Message, ThreadAutoArchiveDuration, ThreadChannel } from "discord.js";
import { getAllMessages } from "../util/discord.js";

const rawdbChannel = await client.channels.fetch(constants.databaseChannel)
if (!rawdbChannel?.isTextBased() || rawdbChannel.isDMBased() || rawdbChannel.isThread() || rawdbChannel.isVoiceBased()) throw new Error("DatabaseChannel cannot have threads!")
const dbChannel = rawdbChannel
const dbThreads = (await dbChannel.threads.fetch()).threads

function parse<type>(json: string): type {
    return JSON.parse(json) as type;
}
let databases: { [serverid: string]: ThreadChannel } = {}
let constructed: string[] = []
let dbmessages: { [serverid: string]: Message[] } = {}

export class DB<data> {
    private data: { [serverid: string]: data | null } = {};
    name: string = "";

    constructor(name: string) {
        if (constructed.includes(name)) {
            throw new RangeError(
                `Cannot create a second database for ${name}, they will have conflicting data`,
            );
        }
        constructed.push(name)
        this.name = name
    }

    async getData(serverid: string) {
        if (this.data[serverid]) return this.data[serverid]
        const thread = databases[serverid] ?? dbThreads.find(thread => thread.name == serverid) ?? await dbChannel.threads.create({
            name: serverid,
            autoArchiveDuration: ThreadAutoArchiveDuration.OneHour
        })
        databases[serverid] = thread
        if (!dbmessages[serverid]) dbmessages[serverid] = await getAllMessages(thread)

        const message = dbmessages[serverid]?.find(m => m.content == this.name) ??
            await (async () => {
                let m = await thread.send({
                    content: this.name
                })
                dbmessages[serverid] = await getAllMessages(thread)
                return m
            })()
        const attachment = message.attachments.first()?.url

        this.data[serverid] = attachment ? parse<data>(await (await fetch(attachment)).text()) : null

        return this.data[serverid]

    }

    async setData(serverid: string, data: data) {
        this.data[serverid] = data
        const thread = databases[serverid] ?? dbThreads.find(thread => thread.name == serverid) ?? await dbChannel.threads.create({
            name: serverid,
            autoArchiveDuration: ThreadAutoArchiveDuration.OneHour
        })
        databases[serverid] = thread
        if (!dbmessages[serverid]) dbmessages[serverid] = await getAllMessages(thread)

        const message = dbmessages[serverid]?.find(m => m.content == this.name) ??

            await (async () => {
                let m = await thread.send({
                    content: this.name
                })
                dbmessages[serverid] = await getAllMessages(thread)
                return m
            })()


        const attData = JSON.stringify(this.data[serverid])

        const files =
            data ?
                [{ attachment: Buffer.from(attData, "utf8"), name: `${this.name}.txt` }]
                : [];

        message.edit({
            content: this.name, files
        })
    }
}