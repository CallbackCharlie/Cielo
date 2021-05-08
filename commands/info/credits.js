const Discord = require('discord.js');

module.exports = {
    name: 'credits',
    description: 'List of everyone who has contributed to Cielo in some form.',
    enabled: true,
    category: 'info',
    run: async (client, message, args) => {
        const creditsEmbed = new Discord.MessageEmbed()
            .setColor('#3498DB')
            .setTitle('Credits')
            .addFields(
                { name: 'Originator & Developer', value: 'Tetra#1734' },
                { name: 'Originator', value: 'charge#4218' },
                { name: 'Developer', value: 'Kunalヅ#0004' }
            )
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()

        return await message.channel.send(creditsEmbed);
    }
}
