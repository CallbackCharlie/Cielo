const sqlite = require('sqlite3');
let db;

class Database {

    /* Connect to the SQLite Database */
    static async connect() {
        return new Promise(async (resolve, reject) => {
            db = new sqlite.Database('./data.db', (err) => {
                if (err) reject(err);
                resolve(true);
            });
        });
    }

    /* Used to setup the base database structure, only to be used on database changes */
    static async setup() {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            await db.run('CREATE TABLE guilds (GuildID varchar(18), Prefix varchar(3))');
            await db.run('CREATE TABLE afk (GuildID varchar(18), UserID varchar(18), Status varchar(30))');
            await db.run('CREATE TABLE blacklisted_words (GuildID varchar(18), Word varchar(20))');
            await db.run('CREATE TABLE warnings (WarningID varchar(5), GuildID varchar(18), UserID varchar(18), Reason varchar(30))');
            resolve(true);
        });
    }

    /* Inserts a guild into the database when the bot joins a guild */
    static async insertGuild(guildID) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            db.run(`INSERT INTO guilds(GuildID) VALUES ('${guildID}')`);
            resolve(true);
        });
    }

    /* Drops a guild from the database when the bot leaves a guild */
    static async dropGuild(guildID) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            db.run(`DELETE FROM guilds WHERE GuildID = '${guildID}'`);
            resolve(true);
        });
    }

    /* Updates a guild's prefix to something they prefer to the default */
    static async updatePrefix(guildID, prefix) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            db.run(`UPDATE guilds SET Prefix = '${prefix}' WHERE GuildID = '${guildID}'`);
            resolve(true);
        });
    }

    static async fetchGuild(guildID) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            db.get(`SELECT GuildID FROM guilds WHERE GuildID = '${guildID}'`, (err, row) => {
                if (err) reject(err);
                resolve(row.GuildID);
            });
        });
    }

    static async fetchPrefix(guildID) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            db.get(`SELECT Prefix FROM guilds WHERE GuildID = '${guildID}'`, (err, row) => {
                if (err) reject(err);
                resolve(row.Prefix);
            });
        });
    }

    static async updateAutorole(guildID, roleID) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            db.run(`UPDATE guilds SET Autorole = '${roleID}' WHERE GuildID = '${guildID}'`);
            resolve(true);
        });
    }

    static async dropAutorole(guildID) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            db.run(`UPDATE guilds SET Autorole = null WHERE GuildID = '${guildID}'`);
            resolve(true);
        });
    }

    static async fetchAutorole(guildID) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            db.get(`SELECT Autorole FROM guilds WHERE GuildID = '${guildID}'`, (err, row) => {
                if (err) reject(err);
                resolve(row.Autorole);
            });
        });
    }

    static async insertAFK(guildID, userID, status) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            db.get(`INSERT INTO afk(GuildID, UserID, Status) VALUES ('${guildID}', '${userID}', '${status}')`);
            resolve(true);
        });
    }

    static async dropAFK(guildID, userID) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            db.run(`DELETE FROM afk WHERE GuildID = '${guildID}' AND UserID = '${userID}'`);
            resolve(true);
        });
    }

    static async fetchAFKStatus(guildID, userID) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            db.get(`SELECT Status FROM afk WHERE GuildID = '${guildID}' AND UserID = '${userID}'`, (err, row) => {
                if (err) reject(err);
                !row || row === undefined ? resolve(undefined) : resolve(row.Status);
            });
        });
    }

    static async insertBlacklistWord(guildID, word) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            db.get(`INSERT INTO blacklisted_words(GuildID, Word) VALUES ('${guildID}', '${word}')`);
            resolve(true);
        });
    }

    static async dropBlacklistWord(guildID, word) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            db.get(`SELECT Word FROM blacklisted_words WHERE GuildID = '${guildID}' AND Word = '${word}'`, (err, row) => {
                if (err) reject(err);
                if (!row || row === undefined) resolve(false);
                db.run(`DELETE FROM blacklisted_words WHERE GuildID = '${guildID}' AND Word = '${word}'`);
                resolve(true);
            });
        });
    }

    static async fetchBlacklistWords(guildID) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            let words = [];
            db.all(`SELECT Word FROM blacklisted_words WHERE GuildID = '${guildID}'`, (err, rows) => {
                if (err) reject(err);
                rows.forEach(word => {
                    words.push(word.Word)
                });
                !rows || rows === undefined ? resolve(undefined) : resolve(words);
            });
        });
    }

    static async resetBlacklist(guildID) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            db.run(`DELETE FROM blacklisted_words WHERE GuildID = '${guildID}'`);
            resolve(true);
        });
    }

    static async insertWarn(warningID, userID, guildID, reason) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            db.get(`INSERT INTO warnings(WarningID, GuildID, UserID, Reason) VALUES ('${warningID}', '${guildID}', '${userID}', '${reason}')`);
            resolve(true);
        });
    }

    static async dropWarn(warningID, guildID) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            db.get(`SELECT WarningID FROM warnings WHERE GuildID = '${guildID}' AND WarningID = '${warningID}'`, (err, row) => {
                if (err) reject(err);
                if (!row || row === undefined) reject(false);
                db.run(`DELETE FROM warnings WHERE GuildID = '${guildID}' AND WarningID = '${warningID}'`);
                resolve(true);
            });
        });
    }

    static async resetWarn(guildID, userID) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            db.get(`SELECT WarningID FROM warnings WHERE GuildID = '${guildID}' AND UserID = '${userID}'`, (err, row) => {
                if (err) reject(err);
                if (!row || row === undefined) reject(false);
                db.run(`DELETE FROM warnings WHERE UserID = '${userID}''`);
                resolve(true);
            });
        });
    }

    static async fetchWarns(userID, guildID) {
        return new Promise(async (resolve, reject) => {
            if (!client.isConnected() || !db) this.connect();
            let warns = [];
            db.all(`SELECT Reason FROM warnings WHERE GuildID = '${guildID}' AND UserID = '${userID}'`, (err, data) => {
                if (err) reject(err); 
                data.forEach(reason => {
                    warns.push(reason.Reason);
                });
                
                !data || data === undefined ? resolve(undefined) : resolve(warns);
            });
        })
    }
}

module.exports = Database;