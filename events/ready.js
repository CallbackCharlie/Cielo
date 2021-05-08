const { green, white } = require('chalk');
const db = require('../managers/database');

module.exports = {
    event: 'ready',
    enabled: true,
    run: async (client) => {
        await client.user.setActivity(',help', { type: 'PLAYING' });
        
        console.log(green('\n[SUCCESS] ') + white('Connected to Database'));
        console.log(green('[SUCCESS] ') + white('Cielo Launched'));
    }
}