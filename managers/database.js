const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_URI;

const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoReconnect: false
}
const client = new MongoClient(uri, config);
let db;
client.connect(err => {
    if (err) throw err;
    db = client.db('Cielo');
});

class Database {

    static async connect() {
        return new Promise(async (resolve, reject) => {
            client.connect(err => {
                if (err) reject(err);
                db = client.db('Cielo');
                resolve(true);
            });
        });
    }

    static async insertGuild(guildID) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            const guild = { GuildID: guildID };
            db.collection('Servers').insertOne(guild, (err, res) => {
                if (err) reject(err);
                resolve(true);
            });
        });
    }

    static async dropGuild(guildID) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            db.collection('Servers').deleteOne({ GuildID: guildID }, (err, res) => {
                if (err) reject(err);
                resolve(true);
            });
        });
    }

    static async fetchGuild(guildID) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            db.collection('Servers').findOne({ GuildID: guildID }, (err, result) => {
                if (err) reject(err);
                resolve(result.GuildID);
            });
        });
    }

    static async updatePrefix(guildID, prefix) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            const query = { $set: { Prefix: prefix } };
            db.collection('Servers').updateOne({ GuildID: guildID }, query, (err, res) => {
                if (err) reject(err);
                resolve(true);
            });
        });
    }

    static async fetchPrefix(guildID) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            db.collection('Servers').findOne({ GuildID: guildID }, (err, result) => {
                if (err) reject(err);
                try {
                    resolve(result.Prefix);
                } catch(err) {
                    resolve(undefined);
                }
            });
        });
    }

    static async updateAutorole(guildID, roleID) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            const query = { $set: { Autorole: roleID } };
            db.collection('Servers').updateOne({ GuildID: guildID }, query, (err, res) => {
                if (err) reject(err);
                resolve(true);
            });
        });
    }

    static async dropAutorole(guildID) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            const query = { $unset: { Autorole: '' } };
            db.collection('Servers').updateOne({ GuildID: guildID }, query, (err, res) => {
                if (err) reject(err);
                resolve(true);
            });
        });
    }

    static async fetchAutorole(guildID) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            db.collection('Servers').findOne({ GuildID: guildID }, (err, result) => {
                if (err) reject(err);
                try {
                    resolve(result.Autorole);
                } catch(err) {
                    resolve(undefined);
                }
            });
        });
    }

    static async insertAFK(guildID, userID, status) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            const afk = { GuildID: guildID, UserID: userID, Status: status };
            db.collection('AFKs').insertOne(afk, (err, res) => {
                if (err) reject(err);
                resolve(true);
            });
        });
    }

    static async dropAFK(guildID, userID) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            db.collection('AFKs').deleteOne({ GuildID: guildID, UserID: userID }, (err, res) => {
                if (err) reject(err);
                resolve(true);
            });
        });
    }

    static async fetchAFKStatus(guildID, userID) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            db.collection('AFKs').findOne({ GuildID: guildID, UserID: userID }, (err, result) => {
                if (err) reject(err);
                !result || result === undefined ? resolve(undefined) : resolve(result.Status);
            });
        });
    }
    
    static async insertBlacklistWord(guildID, word) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            const afk = { GuildID: guildID, Word: word };
            db.collection('BlacklistedW').insertOne(afk, (err, res) => {
                if (err) reject(err);
                resolve(true);
            });
        });
    }

    static async dropBlacklistWord(guildID, word) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            db.collection('BlacklistedW').findOne({ GuildID: guildID, Word: word }, (err, result) => {
                if (!result || result == 'null') resolve(false);
                db.collection('BlacklistedW').deleteOne({ GuildID: guildID, Word: word }, (err, res) => {
                    if (err) reject(err);
                    resolve(true);
                });
            });
        });
    }

    static async resetBlacklist(guildID) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            db.collection('BlacklistedW').findOne({ GuildID: guildID }, (err, result) => {
                if (!result || result == 'null') resolve(false);
                db.collection('BlacklistedW').deleteMany({ GuildID: guildID }, (err, res) => {
                    if (err) reject(err);
                    resolve(true);
                });
            });
        });
    }

    static async fetchBlacklistWords(guildID) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            let words = []
            db.collection('BlacklistedW').find({ GuildID: guildID }).toArray((err, result) => {
                if (err) reject(err);
                
                result.forEach(word => {
                    words.push(word.Word);
                });
                !result || result === undefined ? resolve(undefined) : resolve(words);
            });
        });
    }

}

module.exports = Database;