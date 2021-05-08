const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'dog',
    description: 'Displays a random image of a dog.',
    enabled: true,
    category: 'fun',
    run: async (client, message, args) => {

        const url = 'https://api.thedogapi.com/v1/images/search';
        await axios.get(url).then(res => {

            const dogEmbed = new Discord.MessageEmbed()
                .setColor('#3498DB')
                .setImage(res.data[0].url)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()

            return message.channel.send(dogEmbed);

        });

    }
}