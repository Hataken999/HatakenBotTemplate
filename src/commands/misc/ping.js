const { EmbedBuilder } = require("discord.js");
const { version } = require('../../../package.json');

module.exports = {
    name: 'ping',
    description: 'Get the latency of the bot and websocket.',
    // devOnly: Boolean,
    // testOnly: true,
    // options: [],
    // deleted: Boolean,

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();
        const ping = reply.createdTimestamp - interaction.createdTimestamp;

        const embed = new EmbedBuilder()
        .setTitle('Pong!')
        .setDescription(`Bot: \`${ping}ms\`\nWebsocket: \`${client.ws.ping}ms\``)
        .setColor('Fuchsia')
        .setTimestamp()
        .setFooter({text: `${client.user.username} v${version}`});

        interaction.editReply({embeds: [embed]});
    }
};