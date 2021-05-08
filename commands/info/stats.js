const Discord = require('discord.js');

module.exports = {
    name: 'stats',
    description: 'Shows bot statistics.',
    enabled: true,
    category: 'info',
    run: async (client, message, args) => {
        let totalUsers = await client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)');
        totalUsers = totalUsers.reduce((acc, memberCount) => acc + memberCount, 0);

        let totalServers = await client.shard.fetchClientValues('guilds.cache.size');
        totalServers = totalServers.reduce((acc, guildCount) => acc + guildCount, 0);

        const getUptime = () => {
            let totalSeconds = (client.uptime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);

            return `${days} Days, ${hours} Hours, ${minutes} Minutes and ${seconds} Seconds`;
        }

        const statsEmbed = new Discord.MessageEmbed()
            .setColor('#3498DB')
            .setTitle('Statistics')
            .addField('Total Users:', totalUsers, true)
            .addField('Total Servers:', totalServers, true)
            .addField('Node Version:', process.version, true)
            .addField('Uptime:', getUptime(), false)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()

        return await message.channel.send(statsEmbed);
    }
}