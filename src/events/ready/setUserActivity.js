const { ActivityType } = require("discord.js");

module.exports = (client) => {
    const guild = client.guilds.cache.get('367241960043315211');
    const totalGuilds = client.guilds.cache.size.toLocaleString();
    const totalMembers = guild.memberCount;

    let status = [
        {
            name: 'Under development...',
            type: ActivityType.Playing,
        },
        {
            name: `${totalMembers} FOG Members`,
            type: ActivityType.Watching,
        },
        {
            name: `${totalGuilds} servers`,
            type: ActivityType.Watching,
        },
        {
            name: `Moona is my owner Waifu`,
            type: ActivityType.Streaming,
            url: 'https://youtube.com/watch?v=VWtQDxwPmHA',
        },
    ];

    client.user.setActivity({
        name: 'Under development...',
        type: ActivityType.Playing,
    })

    let i = 1;
    setInterval(() => {
        client.user.setActivity(status[i]);
        i++;
        if (i === status.length) i = 0;
    }, 10000);
};