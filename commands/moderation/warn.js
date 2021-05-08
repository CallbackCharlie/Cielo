const Discord = require('discord.js');
const db = require('../../managers/database.js')

module.exports = {
  name: 'warn',
  description: 'Warn a user.',
  enabled: true,
  hidden: true,
  category: 'moderation',
  usage: 'warn <user> [reason]',
  run: async (client, message, args) => {
        if (!message.guild.member(message.author).hasPermission('MANAGE_MESSAGES')) {
            return await message.channel.send('__**ERROR**__\nYou do not have the \'MANAGE_MESSAGES\' permission required to use this command.');
        }


        if (!args[0]) return await message.channel.send(`__**ERROR**__\nInvalid Syntax!\n**Usage:** ${client.prefix}${module.exports.usage}`);

        let memberID = args[0].replace(/[\\<>@#&!]/g, '');
        let reason; args[1] ? reason = args.slice(1).join(' ') : reason = 'Not Provided';
        const warnID = [...Array(5)].map((i) => (~~(Math.random() * 36)).toString(36)).join('');

        db.insertWarn(warnID, message.author.id, message.guild.id, reason).then(() => {
            const user = message.guild.members.cache.get(memberID);
            const warnEmbedServer = new Discord.MessageEmbed()
                .setTitle(`${user.user.tag} Has Been Warned`)
                .setColor('#3498DB')
                .setDescription(`**Warned By:** ${message.author}
                **Reason:** ${reason}`)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()

            return message.channel.send(warnEmbedServer);
        });
    }
}