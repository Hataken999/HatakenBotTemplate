const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { version } = require('../../../package.json');

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
        const targetUserId = interaction.options.getUser('target-user');
        const reason = interaction.options.getString('reason') || "No reason provided.";

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(targetUserId);

        if (!targetUser) {
            await interaction.editReply("That user doesn't exist in this server.");
            return;
        }

        if (targetUser.id === client.user.id) {
            await interaction.editReply({content: "You wanna ban me, really?"});
            return;
        }

        if (targetUser.id === interaction.guild.ownerId) {
            await interaction.editReply({content: "It seems like you want to ban the server owner.. But you know you can't right?", ephemeral: true});
            return;
        }

        const targetUSerRolePosition = targetUser.roles.highest.position;
        const authorRolePosition = interaction.member.roles.highest.position;
        const botRolePosition = interaction.guild.members.me.roles.highest.position;

        if (targetUSerRolePosition >= authorRolePosition) {
            await interaction.editReply("You can't ban that user because they have the same/higher role than you!");
            return;
        }

        if (targetUSerRolePosition >= botRolePosition) {
            await interaction.editReply("I can't ban that user because they have the same/higher role than me!");
            return;
        }

        try {
            const channelLog = await interaction.guild.channels.fetch('1078536724692602912');

            // console.log(channelLog);
            // console.log(interaction.guild.name);
            // console.log(interaction.guild.iconURL());
            // console.log(targetUser.user.tag);
            // console.log(targetUser);
            // console.log(`<@${interaction.user.id}>`);
            // console.log(reason);
            // console.log(targetUser.displayAvatarURL());
            // console.log(client.user.username);

            const embed = new EmbedBuilder()
            .setAuthor({name: interaction.guild.name, iconURL: interaction.guild.iconURL()})
            .setTitle(`**[BAN] ${targetUser.user.tag}**`)
            .addFields(
                {name: 'User', value: `${targetUser}`, inline: true},
                {name: 'Moderator', value: `<@${interaction.user.id}>`, inline: true},
                {name: 'Reason', value: `${reason}`},
            )
            .setThumbnail(targetUser.displayAvatarURL())
            .setFooter({text: `${client.user.username} v${version}`})
            .setColor('#ff0000')
            .setTimestamp();

            await targetUser.ban({ reason });
            await interaction.editReply({content: `${targetUser} was banned from the server.\nReason: ${reason}`, ephemeral: true});
            await channelLog.send({embeds: [embed]});

            setTimeout(async () => {
                await interaction.deleteReply();
            }, 5000);
        } catch (error) {
            console.log(`There was an error when banning: ${error}`);
        }
    },

    name: 'ban',
    description: 'Bans a member from the server.',
    // devOnly: Boolean,
    // testOnly: Boolean,
    options: [
        {
            name: 'target-user',
            description: 'The user to ban.',
            required: true,
            type: ApplicationCommandOptionType.User,
        },
        {
            name: 'reason',
            description: 'The reason for banning.',
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.BanMembers],
    botPermissions: [PermissionFlagsBits.BanMembers, PermissionFlagsBits.SendMessages],
    testOnly: true,
    // deleted: true,
};