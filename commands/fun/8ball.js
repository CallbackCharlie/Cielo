const Discord = require('discord.js');

const questions = ["It is certain.", "It is decidedly so.", "Without a doubt.", "Yes - definitely.", "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful."]

module.exports = {
    name: '8ball',
    aliases: ['luck'],
    description: 'Answers your desired question.',
    enabled: true,
    category: 'fun',
    usage: '8ball <question>',
    run: async(client, message, args) => {
        if (!args[0]) return await message.channel.send(`__**ERROR**__\nInvalid Syntax!\n**Usage:** ${client.prefix}${module.exports.usage}`);

        const embed = new Discord.MessageEmbed()
            .setTitle("`🎱` 8Ball")
            .addFields({
                name: `${message.author.username}'s Question:`,
                value: args.join(' ')}, {
                name: `Answer:`,
                value: questions[Math.floor(Math.random()*questions.length)]
            })
            .setColor('#3498DB')
            .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()

        return await message.channel.send(embed);
    }
};
