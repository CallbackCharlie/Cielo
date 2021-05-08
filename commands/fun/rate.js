const Discord = require('discord.js');

module.exports = {
    name: 'rate',
    aliases: ['rating'],
    description: 'Rates whatever you say.',
    enabled: true,
    category: 'fun',
    usage: 'rate <phrase>',
    run: async (client, message, args) => {
        if (!args[0]) return await message.channel.send(`__**ERROR**__\nInvalid Syntax!\n**Usage:** ${client.prefix}${module.exports.usage}`);

        const phrase = args.slice(0).join(' ');
        const rating = Math.floor(Math.random() * 10) + 1;

        const ratingEmbed = new Discord.MessageEmbed()
            .setDescription(`I rate **${phrase}** ${rating}/10.`)
            .setColor('#3498DB')
            .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()

        return await message.channel.send(ratingEmbed);
    }
};
