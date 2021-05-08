const db = require('../managers/database');

module.exports = {
    event: 'guildMemberAdd',
    enabled: true,
    run: async (client, member) => {

        db.fetchAutorole(member.guild.id).then(autorole => {
            if (!autorole) return;
            const role = member.guild.roles.cache.find(role => role.id === autorole);
            member.roles.add(role);
        });
        
    }
}