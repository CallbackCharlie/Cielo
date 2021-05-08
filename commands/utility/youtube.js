const { linkStringToIds } = require("youtube-link-to-id"); 
const { google } = require("googleapis");
const { MessageEmbed } = require("discord.js");
require('dotenv').config();

module.exports = {
    name: 'youtube',
    description: 'Get data from youtube.',
    enabled: true,
    category: 'utility',
    usage: 'youtube [channel/video/playlist] [channel/video/playlist link/id]',
    run: async (client, message, args) => {
        if (!args[0]) return await message.channel.send(`__**ERROR**__\nInvalid Syntax!\n**Usage:** ${client.prefix}${module.exports.usage}`);

        if (args[0].toLowerCase() === 'video') {
            let id = linkStringToIds(args[1])[0] || args[1];

            google.youtube('v3').videos.list({
                id: id,
                key: process.env.YOUTUBE_API_KEY,
                part: ['contentDetails', 'id', 'player', 'snippet', 'statistics', 'status']
            }).then((response) => {
                let data = response.data.items[0];

                let embed = new MessageEmbed()
                  .setTitle(data.snippet.title)
                  .setDescription(data.snippet.description)
                  .setThumbnail(data.snippet.thumbnails.high.url)
                  .setURL(`https://www.youtube.com/watch?v=${id}`)
                  .setColor("#3498DB")
                  .addFields(
                    {
                      name: 'Published At:',
                      value: data.snippet.publishedAt
                        .replace('T', ' At ')
                        .replace('Z', ''),
                      inline: true,
                    },
                    {
                      name: 'Channel ID:',
                      value: data.snippet.channelId,
                      inline: true,
                    },
                    {
                      name: 'Channel Title:',
                      value: data.snippet.channelTitle,
                      inline: true,
                    },
                    {
                      name: 'Tags:',
                      value: data.snippet.tags.join(', '),
                      inline: true,
                    },
                    {
                      name: 'Default Language:',
                      value: data.snippet.defaultLanguage || 'None.',
                      inline: true,
                    },
                    {
                      name: 'Region\'s Blocked:',
                      value: data.contentDetails.regionRestriction
                        ? data.contentDetails.regionRestriction.blocked.join(
                            ', '
                        )
                        : 'None.',
                      inline: true,
                    },
                    {
                      name: 'Made-For-Kids?:',
                      value: data.status.madeForKids ? 'Yes' : 'No',
                      inline: true,
                    },
                    {
                      name: 'Views:',
                      value: data.statistics.viewCount,
                      inline: true,
                    },
                    {
                      name: 'Likes:',
                      value: data.statistics.likeCount,
                      inline: true,
                    },
                    {
                      name: 'Dislikes:',
                      value: data.statistics.dislikeCount,
                      inline: true,
                    },
                    {
                      name: 'Favorited:',
                      value: data.statistics.favoriteCount,
                      inline: true,
                    },
                    {
                      name: 'Comments:',
                      value: data.statistics.commentCount,
                      inline: true,
                    }
                  )
                  .setFooter(
                    `Requested By ${message.author.tag}`,
                    message.author.displayAvatarURL()
                  )
                  .setTimestamp();
                return message.channel.send(embed);
            }).catch((err) => {
                console.log(err);
                return message.channel.send('__**ERROR**__\nMake sure the ID/Link you provided is valid.');
            })
        } else {
        	return await message.channel.send(`__**ERROR**__\nInvalid Syntax!\n**Usage:** ${client.prefix}${module.exports.usage}`);
        }
    }
}
