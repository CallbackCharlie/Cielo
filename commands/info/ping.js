const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Shows bot Cielo\'s latency/ping.',
    enabled: true,
    category: 'info',
    run: async (client, message, args) => {
        const pingEmbed = new Discord.MessageEmbed()
            .setColor('#3498DB')
            .setTitle('`🏓` Pong!')
            .addFields(
                { name: 'My Latency:', value: Date.now() - message.createdTimestamp + 'ms' },
                { name: 'Discord API Latency:', value: Math.round(client.ws.ping) + 'ms' }
            )
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()

        return await message.channel.send(pingEmbed);
    }
}