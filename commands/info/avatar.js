const Discord = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Shows your or another member\'s avatar.',
    enabled: true,
    category: 'fun',
    aliases: ['icon', 'av', 'pfp'],
    usage: 'avatar [member]',
    run: async (client, message, args) => {

        if (!args[0]) {
            const avEmbed = new Discord.MessageEmbed()
                .setTitle('Your Avatar')
                .setColor('#3498DB')
                .setImage(message.author.displayAvatarURL({ size: 256, dynamic: true }))
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()

            return await message.channel.send(avEmbed);
        }

        if (args.length == 1) {
            const memberID = args[0].replace(/[\\<>@#&!]/g, '');

            try {
                const member = message.guild.members.cache.get(memberID);

                const avEmbed = new Discord.MessageEmbed()
                    .setTitle(`${member.user.tag}'s Avatar`)
                    .setColor('#3498DB')
                    .setImage(member.user.displayAvatarURL({ size: 256, dynamic: true }))
                    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()

                return await message.channel.send(avEmbed);
            } catch {
                return await message.channel.send(`__**ERROR**__\nInvalid Syntax!\n**Usage:** ${client.prefix}${module.exports.usage}`);
            }
        } else {
            return await message.channel.send(`__**ERROR**__\nInvalid Syntax!\n**Usage:** ${client.prefix}${module.exports.usage}`);
        }

    }
}