const Discord = require('discord.js');
const database = require('../../managers/database.js');

module.exports = {
    name: 'autorole',
    description: 'Sets a role which will automatically be added to a new member.',
    enabled: true,
    category: 'settings',
    usage: 'autorole [set/off] [role]',
    run: async (client, message, args) => {

        if (!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) {
            return await message.channel.send('__**ERROR**__\nYou do not have the \'MANAGE_GUILD\' permission required to use this command.');
        }
        
        if (args.length >= 1) {
            if (args[0] == 'set') {
                if (args.length == 2) {
                    const role = args[1];
                    const roleID = role.replace(/[\\<>@#&!]/g, '');

                    const roleExists = await message.guild.roles.cache.find(x => x.id == roleID)

                    if (roleExists === undefined || !roleExists) {
                        return await message.channel.send('__**ERROR**__\nThe requested role does not exist.');
                    }
    
                    await database.updateAutorole(message.guild.id, roleID);
    
                    const autoroleSuccess = new Discord.MessageEmbed()
                        .setColor('#3498DB')
                        .setTitle('Guild Auto Role Changed')
                        .setDescription(`You have successfully changed the auto role to <@&${roleID}>.`)
                        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                        .setTimestamp()
    
                    return await message.channel.send(autoroleSuccess);
                } else {
                    return await message.channel.send(`__**ERROR**__\nInvalid Syntax!\n**Usage:** ${client.prefix}${module.exports.usage}`);
                }
            } else if (args[0] == 'off') {
                await database.dropAutorole(message.guild.id);

                const autoroleSuccess = new Discord.MessageEmbed()
                    .setColor('#3498DB')
                    .setTitle('Guild Auto Role Removed')
                    .setDescription(`You have removed auto role from this guild.`)
                    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()

                return await message.channel.send(autoroleSuccess);
            } else {
                return await message.channel.send(`__**ERROR**__\nInvalid Syntax!\n**Usage:** ${client.prefix}${module.exports.usage}`);
            }
        } else {
            await database.fetchAutorole(message.guild.id).then(autorole => {
                !autorole ? autorole = '`None`' : autorole = `<@&${autorole}>`;
                const autoroleEmbed = new Discord.MessageEmbed()
                    .setColor('#3498DB')
                    .setTitle('Guild Auto Role')
                    .setDescription(`This guild's auto role is ${autorole}.\n**Usage:** ${client.prefix}${module.exports.usage}`)
                    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()

                return message.channel.send(autoroleEmbed);
            });
        }
    }
}