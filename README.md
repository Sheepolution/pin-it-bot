# Pin it!

A Discord bot for allowing users to pin their messages with attachments. This is useful for channels where people can post their art.

[Invite the bot](https://discord.com/oauth2/authorize?client_id=803325209657606206&permissions=26688&scope=bot)

## How to use

When a member posts a message with an attachment in a channel that is added to the list, the member can click on the bot's 📌 reaction to pin the message. If the channel has reached the maximum number of pins, it will automatically remove the latest pin. Members can unpin their latest pin  

## Commands

`pin>channel add/remove`

Add or remove the channel where this command is used to the list of channels where the bot is active.

`pin>channel [role]`

Restrict this future to members with a certain role. Use `pin>channel everyone` if you want to remove the role restriction.

`pin>prefix [prefix]` 

Change the prefix