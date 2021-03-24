# Pin it!

A Discord bot for allowing users to pin their messages with attachments. This is useful for channels where people can post their art.

[Invite the bot](https://discord.com/oauth2/authorize?client_id=803325209657606206&permissions=26688&scope=bot)

### How to use

When a member posts a message with an attachment in a channel that is added to the list, the member can click on the bot's 📌 reaction to pin the message. If the channel has reached the maximum number of pins, it will automatically remove the latest pin. Members can unpin their latest pin using `pin>unpin`.

### Mod Commands
`pin>prefix [prefix]` 

Change the prefix.

`pin>channel add/remove`

Add or remove the channel where this command is used to the list of channels where the bot is active.

`pin>role [role]`

Restrict this future to members with a certain role. Use `pin>role everyone` if you want to remove the role restriction.

### Example usage

![](https://cdn.discordapp.com/attachments/817036396790939718/824341978774110248/pin-it.gif)