const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'waifu',
    description: 'Displays a random image of a waifu.',
    enabled: true,
    category: 'nsfw',
    run: async (client, message, args) => {
        if (!message.channel.nsfw) {
            return await message.channel.send('__**ERROR**__\nThis command can only be used in an NSFW channel.');
        }

        const url = 'https://waifu.pics/api/nsfw/waifu';
        await axios.get(url).then(res => {

            const waifuEmbed = new Discord.MessageEmbed()
                .setColor('#3498DB')
                .setImage(res.data.url)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()

            return message.channel.send(waifuEmbed);

        });

    }
}