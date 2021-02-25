const defaultPrefix = require('../config.json').defaultPrefix;
const fs = require('fs');

module.exports = {
    getPrefix(id) {
        try {
            let servers = JSON.parse(fs.readFileSync('./servers.json'));
            return servers[id].prefix.value;
        }
        catch {
            return defaultPrefix;
        }
    },
    setPrefix(id, prefix) {
        return new Promise((resolve, reject) => {
            try {
                let servers = JSON.parse(fs.readFileSync('./servers.json'));
                if(!servers[id]) { servers[id] = {} }
                if(!servers.hasOwnProperty('prefix')) { servers[id].prefix = {} }
                servers[id].prefix.value = prefix;
                fs.writeFileSync('./servers.json', JSON.stringify(servers, null, 4));
                resolve('Successfully changed the prefix. New prefix: ' + prefix);
            }
            catch(err) {
                reject(err);
            }
        });
    }
}