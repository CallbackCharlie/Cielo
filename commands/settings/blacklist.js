const Discord = require('discord.js');
const database = require('../../managers/database.js');

module.exports = {
    name: 'blacklist',
    description: 'Removes a message sent by a user if it contains a blacklisted word.',
    enabled: true,
    category: 'settings',
    usage: 'blacklist [add/remove/reset] [word]',
    run: async (client, message, args) => {

        if (!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) {
            return await message.channel.send('__**ERROR**__\nYou do not have the \'MANAGE_GUILD\' permission required to use this command.');
        }

        if (!args[0]) {
            database.fetchBlacklistWords(message.guild.id).then(words => {
                const blacklistEmbed = new Discord.MessageEmbed()
                    .setColor('#3498DB')
                    .setTitle('Blacklisted Words')
                    .setDescription(words[0] ? words.map(x => `\`${x}\``).join('\n') : '`None`')
                    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()

                return message.channel.send(blacklistEmbed);
            });
            return;
        }
        if (args[2]) return await message.channel.send(`__**ERROR**__\nYou can only blacklist words, not phrases.`);

        switch (args[0].toLowerCase()) {
            case 'add':
                if (!args[1]) return await message.channel.send(`__**ERROR**__\nInvalid Syntax!\n**Usage:** ${client.prefix}${module.exports.usage}`);
                if (args[1].length > 20) return await message.channel.send(`__**ERROR**__\nThe provided word cannot be longer than 20 characters.`);

                database.insertBlacklistWord(message.guild.id, args[1].toLowerCase()).then(() => {
                    const blacklistAddedEmbed = new Discord.MessageEmbed()
                        .setColor('#3498DB')
                        .setTitle('Blacklist Updated')
                        .setDescription(`You have successfully added \`${args[1].toLowerCase()}\` to the word blacklist.`)
                        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                        .setTimestamp()
    
                    return message.channel.send(blacklistAddedEmbed);
                });
                return;

            case 'remove':
                if (!args[1]) return await message.channel.send(`__**ERROR**__\nInvalid Syntax!\n**Usage:** ${client.prefix}${module.exports.usage}`);
                database.dropBlacklistWord(message.guild.id, args[1].toLowerCase()).then(bl => {
                    if (!bl) return message.channel.send(`__**ERROR**__\nThe provided word is not blacklisted.`);
                    const blacklistRemovedEmbed = new Discord.MessageEmbed()
                        .setColor('#3498DB')
                        .setTitle('Blacklist Updated')
                        .setDescription(`You have successfully removed \`${args[1].toLowerCase()}\` from the word blacklist.`)
                        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                        .setTimestamp()
    
                    return message.channel.send(blacklistRemovedEmbed);
                });
                return;

            case 'reset':
                database.resetBlacklist(message.guild.id).then(() => {
                    const blacklistResetEmbed = new Discord.MessageEmbed()
                        .setColor('#3498DB')
                        .setTitle('Blacklist Updated')
                        .setDescription(`You have successfully reset your word blacklist.`)
                        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                        .setTimestamp()
    
                    return message.channel.send(blacklistResetEmbed);
                });
                return;

            default:
                return await message.channel.send(`__**ERROR**__\nInvalid Syntax!\n**Usage:** ${client.prefix}${module.exports.usage}`);
        }

    }
}