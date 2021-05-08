const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'thigh',
    description: 'Displays a random image of thighs.',
    enabled: true,
    category: 'nsfw',
    run: async (client, message, args) => {
        if (!message.channel.nsfw) {
            return await message.channel.send('__**ERROR**__\nThis command can only be used in an NSFW channel.');
        }

        const url = 'https://nekobot.xyz/api/image?type=thigh';
        await axios.get(url).then(res => {

            const embed = new Discord.MessageEmbed()
                .setColor('#3498DB')
                .setImage(res.data.message)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()

            return message.channel.send(embed);

        });

    }
}