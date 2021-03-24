import CommandHandler from '../Handlers/CommandHandler';
import IMessageInfo from '../Interfaces/IMessageInfo';
import { Message, Guild as DiscordGuild, MessageReaction, User } from 'discord.js';
import DiscordUtils from '../Utils/DiscordUtils';
import GuildRepository from '../Repositories/GuildRepository';
import RedisConstants from '../Constants/RedisConstants';
import { Redis } from '../Providers/Redis';
import { Utils } from '../Utils/Utils';
import CacheManager from './CacheManager';
import MessageHandler from '../Handlers/MessageHandler';
import SettingsConstants from '../Constants/SettingsConstants';
import ReactionManager from './ReactionManager';
import Discord from '../Providers/Discord';

export default class BotManager {

    private static readonly prefixKey = RedisConstants.REDIS_KEY + RedisConstants.GUILD_KEY + RedisConstants.PREFIX_KEY;

    public static OnReady() {
        console.log(`${SettingsConstants.BOT_NAME}: Connected`);
        CacheManager.CreateTimeoutInterval();
        Discord.GetClient().user.setActivity(`${SettingsConstants.DEFAULT_PREFIX}help`, { type: 'WATCHING' });
    }

    public static async OnMessage(message: Message) {
        if (message.channel.type == 'dm') {
            return;
        }

        if (message.member == null) {
            return;
        }

        const messageInfo: IMessageInfo = DiscordUtils.ParseMessageToInfo(message, message.author);
        var content = message.content.trim();

        const discordGuild = messageInfo.guild;
        if (discordGuild == null) {
            return;
        }

        const loweredContent = message.content.toLowerCase();

        const guild = await GuildRepository.GetOrCreateByDiscordId(discordGuild.id);

        var prefixKey = BotManager.prefixKey + message.guild.id;
        var prefix = await Redis.get(prefixKey);
        if (prefix != null && !loweredContent.startsWith(prefix.toLowerCase())) {
            MessageHandler.OnMessage(messageInfo, guild);
            return;
        }

        prefix = guild.GetPrefix();

        Redis.set(prefixKey, prefix, 'ex', Utils.GetHoursInSeconds(1));

        if (!loweredContent.startsWith(prefix.toLowerCase())) {
            MessageHandler.OnMessage(messageInfo, guild);
            return;
        }

        CommandHandler.OnCommand(messageInfo, content, guild);
    }

    public static OnReaction(reaction: MessageReaction, user: User) {
        if (user.id == SettingsConstants.BOT_ID) {
            return;
        }

        ReactionManager.OnReaction(reaction, user);
    }

    public static async OnAddedToGuild(discordGuild: DiscordGuild) {
        const guild = await GuildRepository.GetOrCreateByDiscordId(discordGuild.id);
        await guild.OnJoin();
    }

    public static async OnKickedFromGuild(discordGuild: DiscordGuild) {
        const guild = await GuildRepository.GetOrCreateByDiscordId(discordGuild.id);
        await guild.OnLeave();
    }

    public static async ClearPrefixCache(messageInfo: IMessageInfo) {
        var prefixKey = this.prefixKey + messageInfo.message.guild.id;
        await Redis.del(prefixKey);
    }
}
