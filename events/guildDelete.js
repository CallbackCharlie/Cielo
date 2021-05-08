const db = require('../managers/database.js');

module.exports = {
    event: 'guildDelete',
    enabled: true,
    run: async (client, guild) => {
        await db.dropGuild(guild.id);
    }
}