const Discord = require('discord.js');

module.exports = {
    name: 'guild',
    description: 'Shows guild information.',
    enabled: true,
    category: 'info',
    run: async (client, message, args) => {

        const vanityURL = (message.guild.vanityURLCode == null) ? 'None' : message.guild.vanityURLCode;
        const vanityUses = (message.guild.vanityURLUses == null) ? '0' : message.guild.vanityURLUses;

        const guildInfoEmbed = new Discord.MessageEmbed()
            .setTitle('Guild Information')
            .setColor('#3498DB')
            .addFields(
                { name: 'Name:', value: message.guild.name, inline: true },
                { name: 'Acronym:', value: message.guild.nameAcronym, inline: true },
                { name: 'ID:', value: message.guild.id, inline: true },
                { name: 'Creation Date:', value: message.guild.createdAt, inline: true },
                { name: 'Owner:', value: message.guild.owner, inline: true },
                { name: 'Shard:', value: message.guild.shardID, inline: true },
                { name: 'Members:', value: message.guild.memberCount, inline: true },
                { name: 'Vanity:', value: vanityURL, inline: true },
                { name: 'Vanity Uses:', value: vanityUses, inline: true }
            )
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()

        await message.channel.send(guildInfoEmbed);

    }
}