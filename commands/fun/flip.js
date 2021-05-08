const Discord = require('discord.js');

module.exports = {
    name: 'flip',
    aliases: ['coinflip', 'cf'],
    description: 'Flips a coin.',
    enabled: true,
    category: 'fun',
    usage: 'flip',

    run: async(client, message, args) => {
        const headsOrTails = Math.random() < 0.5;

        const embed = new Discord.MessageEmbed()
            .setTitle('`:coin:` Coin Flip')
            .setDescription(headsOrTails ? 'Heads' : 'Tails')
            .setColor("#7CFC00")
            .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        return await message.channel.send(embed);
    }
};
