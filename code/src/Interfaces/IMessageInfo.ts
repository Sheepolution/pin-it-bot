import { Channel, Guild, GuildMember, Message, User } from 'discord.js';

export default interface IMessageInfo {
    guild?: Guild;
    channel: Channel;
    user: User;
    member?: GuildMember;
    message: Message;
}