const Discord = require('discord.js');

module.exports = {
    name: 'purge',
    description: 'Purge a number of message in a channel.',
    enabled: true,
    category: 'moderation',
    usage: 'purge [Amount]',
    run: async (client, message, args) => {

        if (!message.member.hasPermission('MANAGE_MESSAGES')) return await message.channel.send('__**ERROR**__\nYou do not have the `MANAGE_MESSAGES` permission required to use this command.');
        if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) return await message.channel.send('__**ERROR**__\nI do not have the `MANAGE_MESSAGES` permission required to use this command.');

        if (args.length > 0 && args[0] >= 1 && args[0] <= 100) {
            await message.delete();

            message.channel.bulkDelete(parseInt(args[0])).then(() => {

                message.channel.send(`♻ Purged ${args[0]} messages!`).then(msg => {
                    msg.delete({ timeout: 5000 }); 
                }).catch(err => console.log(err));

            }).catch(err => {
                console.log(err)
                return message.channel.send('__**ERROR**__\nSomething went wrong, contact our staff team [here](https://cielodiscord.com/join) to report this issue.');
            });

        } else {
            return await message.channel.send('__**ERROR**__\nThe provided amount must be between 1-100.').then(msg => {msg.delete({ timeout: 5000 }); message.delete({ timeout: 5000} )});
        }
    }
}
