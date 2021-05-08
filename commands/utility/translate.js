const Discord = require('discord.js');
const translate = require('@iamtraction/google-translate');
const languages = require('../../languages.js');

module.exports = {
    name: 'translate',
    description: 'Translates text to a desired language.',
    enabled: true,
    category: 'utility',
    usage: 'translate <from> <to> <to translate>',
    run: async (client, message, args) => {
        
        if (!args[2]) return await message.channel.send(`__**ERROR**__\nInvalid Syntax!\n**Usage:** ${client.prefix}${module.exports.usage}`);

        let from = args[0];
        let to = args[1];
        const toTranslate = args.slice(2).join(' ');

        if (from.length <= 2) {
            from = languages.filter(e => e.abrv === from)[0].abrv;
            if (!from) return await message.channel.send(`__**ERROR**__\nThe \`from\` language code is invalid.`);
        } else {
            from = languages.filter(e => e.name === from)[0].abrv;
            if (!from) return await message.channel.send(`__**ERROR**__\nThe \`from\` language code is invalid.`);
        }

        if (to.length <= 2) {
            to = languages.filter(e => e.abrv === to)[0].abrv;
            if (!to) return await message.channel.send(`__**ERROR**__\nThe \`to\` language code is invalid.`);
        } else {
            to = languages.filter(e => e.name === to)[0].abrv;
            if (!to) return await message.channel.send(`__**ERROR**__\nThe \`to\` language code is invalid.`);
        }

        translate(toTranslate, { from: from, to: to }).then(res => {
            from = languages.filter(e => e.abrv === from)[0].name;
            to = languages.filter(e => e.abrv === to)[0].name;

            const translateEmbed = new Discord.MessageEmbed()
                .setTitle('Translation Successful')
                .setColor('#3498DB')
                .setDescription(`**${from.charAt(0).toUpperCase() + from.slice(1)}:** ${toTranslate}
                **${to.charAt(0).toUpperCase() + to.slice(1)}:** ${res.text}`)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()

            return message.channel.send(translateEmbed)
        }).catch(err => {
            message.channel.send(`__**ERROR**__\nSomething went wrong, contact our staff team [here](https://cielodiscord.com/join) to report this issue.`);
            return console.log(err);
        });

    }
}