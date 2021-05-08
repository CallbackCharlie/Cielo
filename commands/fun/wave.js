const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'wave',
    description: 'Waves a mentioned member.',
    enabled: true,
    category: 'fun',
    usage: 'wave [@member]',
    run: async (client, message, args) => {

        const url = 'https://waifu.pics/api/sfw/wave';
        await axios.get(url).then(res => {

            let mentioned = message.mentions.members.first();
            if (!mentioned || mentioned === undefined) {
                const embed = new Discord.MessageEmbed()
                    .setColor('#3498DB')
                    .setTitle(`${message.author.username} waved at Cielo`)
                    .setImage(res.data.url)
                    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()

                return message.channel.send(embed);
            }

            mentioned = mentioned.user.username;
            const embed = new Discord.MessageEmbed()
                .setColor('#3498DB')
                .setTitle(`${message.author.username} waved at ${mentioned}`)
                .setImage(res.data.url)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()

            return message.channel.send(embed);

        });

    }
}