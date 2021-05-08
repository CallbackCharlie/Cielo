const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'help',
    description: 'Displays a list of bot-related commands.',
    enabled: true,
    category: 'info',
    run: async (client, message, args) => {
        const categories = client.categories;
        const catLower = [];
        categories.forEach(cat => catLower.push(cat.toLowerCase()));
        const commands = client.commands.array();

        const categoriesEmbed = new Discord.MessageEmbed()
            .setColor('#3498DB')
            .setTitle('Help Menu')
            .setDescription(`**Prefix:** \`${client.prefix}\``)
            .addFields(
                { name: 'Categories', value: categories.map(x => `➥ ${x.charAt(0).toUpperCase() + x.slice(1)}`) },
                { name: 'View Commands in a Category', value: `\`\`\`${client.prefix}help category [Category]\`\`\`` },
                { name: 'View Info of a Command', value: `\`\`\`${client.prefix}help [Command]\`\`\`` },
                { name: 'Cielo', value: '[Invite Bot](https://discord.com/oauth2/authorize?client_id=815395607228973056&scope=bot&permissions=1573256438) | [Support Server](https://cielodiscord.com/join)' }
            )
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()

        
        if (!args[0]) return await message.channel.send(categoriesEmbed);

        if (args[0].toLowerCase() === 'category') {
            if (!args[1]) return await message.channel.send(categoriesEmbed);
            if (!catLower.indexOf(args[1].toLowerCase() > -1)) return await message.channel.send('__**ERROR**__\nThe requested category does not exist.');

            const commandListEmbed = new Discord.MessageEmbed()
                .setColor('#3498DB')
                .setTitle(`Help Menu | ${args[1].toLowerCase().charAt(0).toUpperCase() + args[1].toLowerCase().slice(1)} Commands`)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()

            let count = 0;
            for (cmd of commands) {
                if (!cmd.hidden) {
                    if (cmd.enabled) {
                        if (cmd.category === args[1].toLowerCase()) {
                            count++;
                            commandListEmbed.addField(client.prefix + cmd.name, cmd.description);
                        }
                    }
                }
            }

            if (count === 0) commandListEmbed.setDescription('There are no commands in this category.');

            return await message.channel.send(commandListEmbed);
        }

        if (args[0]) {
            const cmd = commands.filter(x => x.name === args[0].toLowerCase());
            if (!cmd || !cmd.length) return await message.channel.send('__**ERROR**__\nThe requested command does not exist.');
            const cat = cmd[0].category.toLowerCase() === 'nsfw' ? cmd[0].category = 'NSFW' : cmd[0].category.charAt(0).toUpperCase() + cmd[0].category.slice(1)

            const commandInfoEmbed = new Discord.MessageEmbed()
                .setColor('#3498DB')
                .setTitle(`Help Menu | ${args[0].toLowerCase().charAt(0).toUpperCase() + args[0].toLowerCase().slice(1)} Info`)
                .addFields(
                    { name: 'Name:', value: cmd[0].name },
                    { name: 'Description:', value: cmd[0].description },
                    { name: 'Usage:', value: `${cmd[0].usage ? client.prefix + cmd[0].usage : client.prefix + cmd[0].name}` },
                    { name: 'Category:', value: cat },
                    { name: 'Aliases:', value: cmd[0].aliases ? cmd[0].aliases.map(x => `\`${x}\``).join(' ') : '`None`' },
                    { name: 'Enabled:', value: cmd[0].enabled ? 'Yes' : 'No' }
                )
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()

            return await message.channel.send(commandInfoEmbed);
        }

    }
}