require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');
const { green, white } = require('chalk');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.categories = [];
client.prefix = process.env.PREFIX || ',';

/* Command Handler */
fs.readdirSync('./commands/').forEach(category => {
    const commands = fs.readdirSync(`./commands/${category}/`).filter(cmd => cmd.endsWith('.js'));
    client.categories.push(category);

    for (let command of commands) {
        const com = require(`./commands/${category}/${command}`);
        if (!com.enabled) continue;
        client.commands.set(com.name, com);

        console.log(green('[SUCCESS] ') + white(`Loaded Command: ${com.name}`));
    }
});
console.log(' ');

/* Event Handler */
const events = fs.readdirSync('./events/').filter(cmd => cmd.endsWith('.js'));

events.forEach(event => {
    const e = require(`./events/${event}`);
    if (!e.enabled) return;
    const eventName = e.event;
    console.log(green('[SUCCESS] ') + white(`Loaded Event: ${event.split('.')[0]}`));

    client.on(eventName, e.run.bind(null, client));

});

client.login(process.env.TOKEN);