const Discord = require('discord.js');

module.exports = {
    name: 'poll',
    description: 'Create a poll with a question of your choice.',
    enabled: true,
    category: 'utility',
    usage: 'poll <title> | <option1>, <option2>, <option3>...<option10>',
    run: async (client, message, args) => {
        let argsSplitted = args.join(' ').split('|');

        let title = argsSplitted[0];
        let options = argsSplitted[1];
        if (!title || !options) return await message.channel.send(`__**ERROR**__\nInvalid Syntax!\n**Usage:** ${client.prefix}${module.exports.usage}`);

        let optionsSplitted = options.split(',')
        let maxOptions = 10;
        let emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

        if (optionsSplitted.length > maxOptions || optionsSplitted.length < 0) return await message.channel.send('__**ERROR**__\nYou can only have up to 10 options.');

        let description = ''

        for (let i = 0; i < optionsSplitted.length; i++) description += `${emojis[i]} - ${optionsSplitted[i]}\n\n`

        let embed = new Discord.MessageEmbed()
            .setTitle(title)
            .setColor('#3498DB')
            .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(description)
            .setTimestamp();

        return message.channel.send(embed)
            .then(msg => {
                for (let i = 0; i < optionsSplitted.length; i++) msg.react(`${emojis[i]}`)
            })
    }
}
