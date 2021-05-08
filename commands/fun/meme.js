const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'meme',
    description: 'Displays a random meme from reddit.',
    enabled: true,
    category: 'fun',
    run: async (client, message, args) => {

        const url = 'http://meme-api.herokuapp.com/gimme';
        await axios.get(url).then(res => {

            const memeEmbed = new Discord.MessageEmbed()
                .setTitle(res.data.title)
                .setColor('#3498DB')
                .setImage(res.data.url)
                .setFooter(`via r/${res.data.subreddit}`)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()

            return message.channel.send(memeEmbed);

        });

    }
}