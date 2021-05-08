const db = require('../managers/database');

module.exports = {
    event: 'message',
    enabled: true,
    run: async (client, message) => {
        if (message.author.bot) return;
        if (message.channel.type === 'dm') return;

        db.fetchPrefix(message.guild.id).then(prefix => {
            !prefix || prefix === null || prefix === undefined || prefix === 'null' ? client.prefix = process.env.PREFIX : client.prefix = prefix;
            if (!message.content.startsWith(client.prefix)) return;

            db.fetchGuild(message.guild.id).then(guildID => {
                if (guildID === message.guild.id) return;
    
                db.insertGuild(message.guild.id);
            });

            let content = message.content.split(' ');
            let command = content[0].toLowerCase();
            let args = content.slice(1);
            
            const commandName = command.slice(client.prefix.length)
    
            let com = client.commands.get(commandName)
                    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
            if (com) com.run(client, message, args);
        });
    }
}