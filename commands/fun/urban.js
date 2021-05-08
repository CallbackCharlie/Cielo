const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'urban',
    description: 'Returns a definition of a word from urban dictionary.',
    enabled: true,
    category: 'fun',
    usage: 'urban <word>',
    run: async (client, message, args) => {

        if (!args[0]) return await message.channel.send(`__**ERROR**__\nInvalid Syntax!\n**Usage:** ${client.prefix}${module.exports.usage}`);

        const word = args.slice(0).join(' ');
        const url = `http://api.urbandictionary.com/v0/define?term=${word}`;
        axios.get(url).then(res => {
            try {
                const wordEmbed = new Discord.MessageEmbed()
                    .setColor('#3498DB')
                    .setTitle(res.data.list[0].word)
                    .addFields(
                        { name: 'Definition', value: res.data.list[0].definition },
                        { name: 'Example', value: res.data.list[0].example },
                        { name: 'Thumbs Up', value: res.data.list[0].thumbs_up, inline: true },
                        { name: 'Thumbs Down', value: res.data.list[0].thumbs_down, inline: true },
                        { name: 'Date Written', value: res.data.list[0].written_on.replace('T', ' At ').replace('Z', ''), inline: true },
                    )
                    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()

            return message.channel.send(wordEmbed);
            } catch (err) {
                return message.channel.send(`__**ERROR**__\nThat word was not found in urban dictionary.`);
            }

        });

    }
}