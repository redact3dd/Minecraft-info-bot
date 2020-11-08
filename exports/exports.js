const defaultPrefix = require('../config.json').defaultPrefix;
const fs = require('fs');

module.exports = {
    getPrefix(id) {
        let servers = JSON.parse(fs.readFileSync('./servers.json'));
        if(servers.hasOwnProperty(id)) return servers[id];
        return defaultPrefix;
    },
    setPrefix(id, prefix) {
        return new Promise((resolve, reject) => {
            try {
                let servers = JSON.parse(fs.readFileSync('./servers.json'));
                servers[id] = prefix
                fs.writeFileSync('./servers.json', JSON.stringify(servers, null, 4));
                resolve('Successfully changed the prefix. New prefix: ' + prefix);
            }
            catch(err) {
                reject(err);
            }
        });
    }
    
}