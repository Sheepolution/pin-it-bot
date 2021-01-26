import { Client, Message, MessageReaction, User } from 'discord.js';
import DiscordService from '../Services/DiscordService';

export default class Discord {

    public static client: Client;

    public static eventReadyCallback: Function;
    public static eventMessageCallback: Function;
    public static eventReactionAddCallback: Function;
    public static eventReactionRemoveCallback: Function;

    public static SetEventReadyCallback(callback: Function) {
        this.eventReadyCallback = callback;
    }

    public static SetEventMessageCallback(callback: Function) {
        this.eventMessageCallback = callback;
    }

    public static SetEventReactionAddCallback(callback: Function) {
        this.eventReactionAddCallback = callback;
    }

    public static Init() {
        this.client = new Client({ partials: ['MESSAGE', 'REACTION'] });

        DiscordService.SetClient(this.client)

        this.client.on('ready', async () => { await Discord.EventReady() });
        this.client.on('message', async (message) => { await Discord.EventMessage(message) });
        this.client.on('messageReactionAdd', async (reaction, user) => { await Discord.EventReactionAdd(reaction, <User>user) });
        this.client.login(process.env.TOKEN);
    }

    public static GetClient() {
        return this.client;
    }

    private static async EventReady() {
        if (this.eventReadyCallback == null) {
            return;
        }

        this.client.user?.setActivity('pin!help')

        this.eventReadyCallback();
    }

    private static async EventMessage(message: Message) {
        if (this.eventMessageCallback == null) {
            return;
        }

        if (message.author.bot) {
            return;
        }

        this.eventMessageCallback(message);
    }

    private static async EventReactionAdd(reaction: MessageReaction, user: User) {
        if (user.bot) {
            return;
        }

        this.eventReactionAddCallback(reaction, user);
    }
}
