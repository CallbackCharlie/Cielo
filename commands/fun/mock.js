module.exports = {
    name: 'mock',
    description: 'Translates provided text to mock text.',
    enabled: true,
    category: 'fun',
    run: async (client, message, args) => {

        const generateMock = (text) => {
            return new Promise(async (resolve, reject) => {
                let res = '';
                text = text.toLowerCase();

                for (let i = 0; i < text.length; i++) {
                    res += i % 2 == 0 ? text.charAt(i).toUpperCase() : text.charAt(i);
                }
                resolve(res);
            });
        } 

        if (!args[0]) return await message.channel.send(`__**ERROR**__\nInvalid Syntax!\n**Usage:** ${client.prefix}${module.exports.usage}`);
        const text = args.slice(0).join(' ');

        generateMock(text).then(mock => {
            return message.channel.send(mock);
        });
    }
}