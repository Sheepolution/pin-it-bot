# Pin it!

A Discord bot for allowing users to pin their messages with attachments. Useful for channels where people can post art.

[Invite the bot](https://discord.com/oauth2/authorize?client_id=803325209657606206&permissions=10304&scope=bot)

## How to use

When a user posts a message with an attachment in a channel that is added to the list, the user can click on the bot's 📌 reaction to pin the message. If the channel has reached the maximum number of pins, it will automatically remove the latest pin.

## Commands

`pin!add`

Add the channel where this command is used to the list of channels where the bot is active.

`pin!remove`

Add the channel where this command is used to the list of channels where the bot is active.

## Hosting the bot

1. install [node.js](https://nodejs.org/en/)
2. open a terminal and navigate to the `code` folder
3. run `npm install` to install all the dependencies.
4. Run `npm run-script build`
5. Make sure you have an `.env` file in your `code` directory with the variable `TOKEN` for your bot's token.
6. Run `node lib/Index.js`.

### Example .env file

```bash
TOKEN=[Discord bot token]
```