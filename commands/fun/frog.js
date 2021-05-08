const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'frog',
    description: 'Displays a random image of a frog.',
    enabled: true,
    category: 'fun',
    run: async (client, message, args) => {

        const randInt = Math.floor(Math.random() * (54 - 10 + 1) + 10);
        const url = `http://www.allaboutfrogs.org/funstuff/random/00${randInt}.jpg`;

        const frogEmbed = new Discord.MessageEmbed()
            .setColor('#3498DB')
            .setImage(url)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()

        return message.channel.send(frogEmbed);

    }
}