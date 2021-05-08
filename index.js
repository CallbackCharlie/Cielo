require('dotenv').config();
const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: process.env.TOKEN, shards: 'auto' });

manager.on('shardCreate', shard => console.log(`Launched Shard ${shard.id}`));
manager.spawn();