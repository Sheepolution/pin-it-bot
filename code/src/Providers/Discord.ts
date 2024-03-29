import { Client, Guild, Message, MessageReaction, User } from 'discord.js';
import DiscordService from '../Services/DiscordService';

export default class Discord {

    public static client: Client;

    public static eventReadyCallback: Function;
    public static eventMessageCallback: Function;
    public static eventReactionAddCallback: Function;
    public static eventGuildCreate: Function;
    public static eventGuildDelete: Function;

    public static SetEventReadyCallback(callback: Function) {
        this.eventReadyCallback = callback;
    }

    public static SetEventMessageCallback(callback: Function) {
        this.eventMessageCallback = callback;
    }

    public static SetEventReactionAddCallback(callback: Function) {
        this.eventReactionAddCallback = callback;
    }

    public static SetEventGuildCreateCallback(callback: Function) {
        this.eventGuildCreate = callback;
    }

    public static SetEventGuildDeleteCallback(callback: Function) {
        this.eventGuildDelete = callback;
    }

    public static Init() {
        this.client = new Client({ partials: ['MESSAGE', 'REACTION'] });

        DiscordService.SetClient(this.client);

        this.client.once('ready', () => { Discord.EventReady(); });
        this.client.on('guildCreate', (guild) => { Discord.EventGuildCreate(guild); });
        this.client.on('guildDelete', (guild) => { Discord.EventGuildDelete(guild); });
        this.client.on('message', (message) => { Discord.EventMessage(message); });
        this.client.on('messageReactionAdd', async (reaction, user) => { await Discord.EventReactionAdd(reaction, <User>user); });
        this.client.login(process.env.TOKEN);
    }

    public static GetClient() {
        return this.client;
    }

    private static EventReady() {
        if (this.eventReadyCallback == null) {
            return;
        }

        this.eventReadyCallback();
    }

    private static EventGuildCreate(guild: Guild) {
        if (this.eventGuildCreate == null) {
            return;
        }

        this.eventGuildCreate(guild);
    }

    private static EventGuildDelete(guild: Guild) {
        if (this.eventGuildDelete == null) {
            return;
        }

        this.eventGuildDelete(guild);
    }

    private static EventMessage(message: Message) {
        if (this.eventMessageCallback == null) {
            return;
        }

        if (message.author.bot) {
            if (message.system && message.type == 'PINS_ADD') {
                message.delete();
            }

            return;
        }

        this.eventMessageCallback(message);
    }

    private static async EventReactionAdd(reaction: MessageReaction, user: User) {
        if (this.eventReactionAddCallback == null) {
            return;
        }

        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (error) {
                return;
            }
        }

        if (user.bot) {
            return;
        }

        this.eventReactionAddCallback(reaction, user);
    }
}