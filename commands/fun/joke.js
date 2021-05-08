const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'joke',
    description: 'Tells a random joke from an API.',
    enabled: true,
    category: 'fun',
    run: async (client, message, args) => {

        const url = 'https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart';
        await axios.get(url).then(res => {

            const jokeEmbed = new Discord.MessageEmbed()
                .setTitle(res.data.setup)
                .setColor('#3498DB')
                .setDescription(res.data.delivery)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()

            return message.channel.send(jokeEmbed);

        });

    }
}