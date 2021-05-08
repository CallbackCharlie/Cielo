const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Bans a specified member.',
    enabled: true,
    category: 'moderation',
    usage: 'ban <Member> [Reason]',
    run: async (client, message, args) => {

        if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) {
            return await message.channel.send('__**ERROR**__\nYou do not have the \'BAN_MEMBERS\' permission required to use this command.');
        }
        if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
            return await message.channel.send('__**ERROR**__\nI do not have the \'BAN_MEMBERS\' permission required to use this command.');
        }

        if (!(args[0])) {
            return await message.channel.send(`__**ERROR**__\nInvalid Syntax!\n**Usage:** ${client.prefix}${module.exports.usage}`);
        }
        let reason;
        !args[1] ? reason = 'Not Provided' : reason = args.slice(1).join(' ');


        const memberID = args[0].replace(/[\\<>@#&!]/g, '');

        try {
            if (!(message.member.roles.highest.rawPosition >= message.guild.members.cache.get(memberID).roles.highest.rawPosition) || 
            (message.member.roles.highest.rawPosition === message.guild.members.cache.get(memberID).roles.highest.rawPosition) ) {
                return await message.channel.send('__**ERROR**__\nYou do not have permissions to ban this member.');
            }
        } catch (err) {
            if (err instanceof TypeError) {
                return await message.channel.send('__**ERROR**__\nThat user is not in this guild.');
            } else {
                return await message.channel.send('__**ERROR**__\nI\'m not sure what caused this error. Please join our [support server](https://discord.gg/7zT5pFgnNS) and report this issue.');
            }
        }

        if (message.guild.members.cache.get(memberID) === message.author) {
            return await message.channel.send('__**ERROR**__\nYou cannot ban yourself.');
        }

        if (message.guild.members.cache.get(memberID) === message.guild.owner) {
            return await message.channel.send('__**ERROR**__\nYou cannot ban the guild owner.');
        }

        const banEmbedDM = new Discord.MessageEmbed()
            .setTitle(`You have been banned from ${message.guild.name}`)
            .setColor('#3498DB')
            .setDescription(`**Banned By:** ${message.author.tag}
            **Reason:** ${reason}`)
            .setTimestamp()

        const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

        client.users.fetch(memberID).then(user => {
            user.send(banEmbedDM);
        }).catch(e => {});

        await delay(100);

        const user = message.guild.members.cache.get(memberID);
        return await user.ban({ reason: reason }).then(() => {
            const banEmbedServer = new Discord.MessageEmbed()
                .setTitle(`${user} Has Been Banned`)
                .setColor('#3498DB')
                .setDescription(`**Banned By:** ${message.author}
                **Reason:** ${reason}`)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()

            return message.channel.send(banEmbedServer);
        }).catch(err => {
            return message.channel.send('__**ERROR**__\nI was unable to ban that member.');
        });

    }
}