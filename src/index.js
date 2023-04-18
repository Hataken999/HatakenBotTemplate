const { Client, GatewayIntentBits, Events, WebSocketManager } = require("discord.js");
const eventHandler = require('./handlers/eventHandler');
require("dotenv").config();

const token = process.env.TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

eventHandler(client);

client.login(token);
