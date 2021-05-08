const Discord = require('discord.js');

module.exports = {
    name: 'pick',
    aliases: ['choose'],
    description: 'Picks one of the specified options you provided.',
    enabled: true,
    category: 'fun',
    usage: 'pick <option 1, option 2, ...>',
    run: async (client, message, args) => {
        if (!args[1] || args.length > 10) return message.channel.send(`__**ERROR**__\nInvalid Syntax!\n**Usage:** ${client.prefix}${module.exports.usage}`);
       
        let args2 = message.content.slice(client.prefix.length).trim().split(/ +/)
        args2.shift();
        args2 = args2.join(' ').split(/,\s*/g)

        let picked = args2[Math.floor(Math.random() * args2.length)];
        
        let embed = new Discord.MessageEmbed()
            .setTitle('`🤞` Pick')
            .addFields({
                name: `${message.author.username}'s Options`,
                value: args2.join(', ')}, {
                name: `Cielos Choice:`,
                value: picked
            })
            .setColor('#3498DB')
            .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()

        return await message.channel.send(embed);
    }
};
