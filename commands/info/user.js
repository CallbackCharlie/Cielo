const Discord = require('discord.js');

module.exports = {
    name: 'user',
    description: 'Shows user information.',
    enabled: true,
    category: 'info',
    usage: 'user [@member]',
    run: async (client, message, args) => {

        let mentioned = message.mentions.members.first();
        if (!mentioned || mentioned === undefined) {
            const nickname = message.member.nickname == null ? 'None' : message.member.nickname;

            const userInfoEmbed = new Discord.MessageEmbed()
                .setTitle('User Information')
                .setColor('#3498DB')
                .addFields(
                    { name: 'User:', value: message.member.user.tag, inline: true },
                    { name: 'Nickname:', value: nickname, inline: true },
                    { name: 'ID:', value: message.member.id, inline: true },
                    { name: 'Join Date:', value: message.member.joinedAt, inline: true },
                    { name: 'Color:', value: message.member.displayHexColor, inline: true },
                    { name: 'Highest Role:', value: message.member.roles.highest, inline: true }
                )
                .setThumbnail(message.member.user.displayAvatarURL({ dynamic: true }))
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()

            return await message.channel.send(userInfoEmbed);
        }
        const nickname = mentioned.nickname == null ? 'None' : mentioned.nickname;

        const userInfoEmbed = new Discord.MessageEmbed()
            .setTitle('User Information')
            .setColor('#3498DB')
            .addFields(
                { name: 'User:', value: mentioned.user.tag, inline: true },
                { name: 'Nickname:', value: nickname, inline: true },
                { name: 'ID:', value: mentioned.id, inline: true },
                { name: 'Join Date:', value: mentioned.joinedAt, inline: true },
                { name: 'Color:', value: mentioned.displayHexColor, inline: true },
                { name: 'Highest Role:', value: mentioned.roles.highest, inline: true }
            )
            .setThumbnail(mentioned.user.displayAvatarURL({ dynamic: true }))
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()

        await message.channel.send(userInfoEmbed);

    }
}