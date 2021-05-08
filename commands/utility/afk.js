const Discord = require('discord.js');
const db = require('../../managers/database');

module.exports = {
    name: 'afk',
    description: 'Create a poll with a question of your choice.',
    enabled: true,
    category: 'utility',
    usage: 'afk [status]',
    run: async (client, message, args) => {
        let status;
        !args[0] ? status = 'Not Provided :(' : status = args.slice(0).join(' ');

        db.dropAFK(message.guild.id, message.author.id).then(() => {
            db.insertAFK(message.guild.id, message.author.id, status).then(() => {
                return message.reply(`\nYour AFK Status has been set to \`${status}\`.`)
            });
        }).catch(err => {
            db.insertAFK(message.guild.id, message.author.id, status).then(() => {
                return message.reply(`\nYour AFK Status has been set to \`${status}\`.`)
            });
        });

    }
}
