const Discord = require('discord.js');

module.exports = {
    name: 'unban',
    description: 'Unban a specified user',
    enabled: true,
    category: 'moderation',
    usage: 'unban [user-id]',
    run: async (client, message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return await message.channel.send('__**ERROR**__\nYou do not have the `BAN_MEMBERS` permission required to use this command.');
        if (!message.guild.me.hasPermission('BAN_MEMBERS')) return await message.channel.send('__**ERROR**__\nI do not have the `BAN_MEMBERS` permission required to use this command.');
     
        let userid = args[0];
      
        message.guild.fetchBans().then(bans => {
            if (bans.size === 0) return message.channel.send('__**ERROR**__\nThat user is not banned in this guild.');
          
            let user = bans.find(b => b.user.id === userID);
           
            if (!user) return message.channel.send('__**ERROR**__\nThat user is not banned in this guild.');
          
            message.guild.members.unban(user.user).then(() => {
                const unbanEmbed = new Discord.MessageEmbed()
                    .setTitle('A Member Has Been Unbanned')
                    .setColor('#3498DB')
                    .setDescription(`**Unbanned:** ${user.user}
                    **Banned By:** ${message.author}`)
                    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()

                return message.channel.send(unbanEmbed);
            });

        });
    }
}