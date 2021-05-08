const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'cat',
    description: 'Displays a random image of a cat.',
    enabled: true,
    category: 'fun',
    run: async (client, message, args) => {

        const url = 'https://api.thecatapi.com/v1/images/search';
        await axios.get(url).then(res => {

            const catEmbed = new Discord.MessageEmbed()
                .setColor('#3498DB')
                .setImage(res.data[0].url)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()

            return message.channel.send(catEmbed);

        });

    }
}