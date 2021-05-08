const Discord = require('discord.js');
const db = require('../../managers/database.js');

module.exports = {
    name: 'prefix',
    description: 'Displays or sets your guild prefix.',
    enabled: true,
    category: 'settings',
    usage: 'prefix [set] [prefix]',
    run: async (client, message, args) => {
        if (!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) {
            return await message.channel.send('__**ERROR**__\nYou do not have the \'MANAGE_GUILD\' permission required to use this command.');
        }

        if (args.length === 2) {
            if (args[0] === 'set') {
                const prefix = args[1];
                if (prefix.length > 3) return await message.channel.send('__**ERROR**__\nGuild prefixes can only have a maximum length of 3 characters.');

                await db.updatePrefix(message.guild.id, prefix);

                const prefixSuccess = new Discord.MessageEmbed()
                    .setColor('#3498DB')
                    .setTitle('Guild Prefix Changed')
                    .setDescription(`You have successfully changed the guild's prefix to \`${prefix}\``)
                    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()

                return await message.channel.send(prefixSuccess);
            } else {
                return await message.channel.send(`__**ERROR**__\nInvalid Syntax!\n**Usage:** ${client.prefix}${module.exports.usage}`);
            }
        } else {
            const prefixEmbed = new Discord.MessageEmbed()
                .setColor('#3498DB')
                .setTitle('Guild Prefix')
                .setDescription(`This guild's prefix is \`${client.prefix}\`\n**Usage:** ${client.prefix}${module.exports.usage}`)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()

            return await message.channel.send(prefixEmbed);
        }
    }
}