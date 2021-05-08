const Discord = require('discord.js');

module.exports = {
    name: 'nuke',
    description: 'Nukes the channel the command is ran in.',
    enabled: true,
    category: 'moderation',
    usage: 'nuke',
    run: async (client, message, args) => {

        if (!message.member.hasPermission('MANAGE_CHANNELS')) return await message.channel.send('__**ERROR**__\nYou do not have the `MANAGE_CHANNELS` permission required to use this command.');
        if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return await message.channel.send('__**ERROR**__\nI do not have the `MANAGE_CHANNELS` permission required to use this command.');

        message.channel.clone().then(channel => {
            channel.setPosition(message.channel.position)
            channel.send(`💥 Nuked Channel!`).then(msg => {
                msg.delete({ timeout: 5000 }); 
            }).catch(err => console.log(err));
        });
        await message.channel.delete()

    }
}
