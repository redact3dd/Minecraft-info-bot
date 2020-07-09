'use strict';

const Discord = require('discord.js');
//const fs = require('fs');
const fetch = require('node-fetch');
const mojang = require('mojang-api');
const mysql = require('mysql');
const db = require('./database/database');

const client = new Discord.Client();
const database = mysql.createConnection(db);

const token = '';

database.connect(err => {
    if (err) throw err;
});

function checkLinkStatus(res) {
    if (res.ok) {
        return res;
    }
    else {
        throw error(res.statusText);
    }
}



client.on('ready', () => {
    client.user.setStatus('online');
    client.user.setActivity('!help', { type: "LISTENING" });
    console.log(`${client.user.tag} ready`);
});

client.on('guildCreate', guild => {
    guild.systemChannel.send('Thank you for adding me to this server! Type !help for a list of commands');
    let queryCode = mysql.format(`INSERT INTO guilds (guild_id) VALUES (${parseInt(guild.id)})`);
    database.query(queryCode, function (err, result, fields) {
        if (err) throw err;
    });
});

client.on('message', msg => {
    if (msg.author.bot) return;

    let guildId = parseInt(msg.channel.guild.id);

    let getPrefix = guildId => {
        return new Promise(function (resolve, reject) {
            database.query('SELECT prefix FROM guilds WHERE guild_id = ?', [guildId], function (err, result, fields) {
                if (!err) resolve(JSON.parse(JSON.stringify(result)));
                else reject(err);
            });
        });
    }

    getPrefix(guildId)
        .then(function (obj) {
            let prefix = obj[0].prefix;
            if (msg.content.slice(0, prefix.length) === prefix) {

                let args = msg.content.slice(prefix.length).split(" ");
                let command = args[0].toLowerCase();

                switch (command) {
                    case 'ping':
                        let currentTime = Date.now();
                        let ping = msg.createdTimestamp - currentTime;
                        msg.channel.send('Response time: ' + ping + 'ms');
                        console.log('Response time in ' + msg.channel.guild.region + ': ' + ping + 'ms');
                        break;
                    case 'help':
                        if (args.length < 2 || args[1] == 1) {
                            msg.channel.send(`Help page 1/3:
                            \n${prefix}ping: Returns the response time between when the command is received and when the answer is sent\n${prefix}/!help [page]: Displays the commands list with a description. Works with both default and custom prefix\n${prefix}prefix [new prefix]: Shows the current prefix. Works with both default and custom prefix. If an  argument is specified, sets the custom prefix to that argument. Works only with custom prefix`);
                        }
                        else if (args[1] == 2) {
                            msg.channel.send(`Help page ${args[1]}/3:
                            \n${prefix}server <ip address>: Check server's online status and players`);
                        }
                        else if (args[1] == 3) {
                            msg.channel.send(`Help page ${args[1]}/3:
                            \n${prefix}uuid <name>: Diplays player's uuid\n${prefix}player <uuid>: Diplays player's name, uuid, skin, cape and name history`);
                        }
                        else msg.channel.send('Invalid page');
                        break;
                    case 'server':
                        if (args.length < 2) {
                            msg.reply(`please specify the server's ip address`);
                            return;
                        }
                        let ip = args[1];
                        let serverUrl = 'https://api.mcsrvstat.us/2/' + ip;
                        fetch(serverUrl, { method: "Get" })
                            .then(checkLinkStatus)
                            .then(res => res.json())
                            .then((json) => {
                                if (json.online) {
                                    if (json.players.online) {
                                        msg.reply(`${ip} is online. ${json.players.online} online players: ${json.players.list}`);
                                    }
                                    else {
                                        msg.reply(`${ip} is online. Online players: none`);
                                    }
                                }
                                else if (json.hostname !== undefined) {
                                    msg.reply(`${ip} is offline`);
                                }
                                else {
                                    msg.reply(`couldn't find server`);
                                }
                            });
                        break;
                    case 'player':
                        if (args.length < 2) {
                            msg.reply(`please specify the player's uuid`);
                            return;
                        }
                        let uuid = args[1];
                        mojang.profile(uuid, function (err, res1) {
                            if (err) console.log(err);
                            else {
                                mojang.nameHistory(uuid, function (err, res2) {
                                    if (err) console.log(err);
                                    let nameHistory = '';
                                    res2.forEach(function (item, index) {
                                        if (index) nameHistory += ', ';
                                        nameHistory += item.name;
                                    });
                                    let embedMessage = {
                                        color: '#00b300',
                                        title: res1.name,
                                        author: {
                                            name: 'Minecraft server status',
                                            icon_url: '',
                                            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                                        },
                                        description: res1.name + "'s profile",
                                        thumbnail: {
                                            url: 'https://crafatar.com/avatars/' + uuid + '.png'
                                        },
                                        fields: [{
                                            name: 'Name',
                                            value: res1.name
                                        },
                                        {
                                            name: 'Uuid',
                                            value: uuid
                                        },
                                        {
                                            name: 'Skin',
                                            value: 'https://crafatar.com/skins/' + uuid + '.png'
                                        },
                                        {
                                            name: 'Cape',
                                            value: 'https://crafatar.com/capes/' + uuid + '.png'
                                        },
                                        {
                                            name: 'Name history',
                                            value: nameHistory
                                        }],
                                        image: {
                                            url: 'https://crafatar.com/renders/body/' + uuid + '.png'
                                        },
                                        timestamp: new Date(),
                                        footer: {
                                            text: 'Minecraft server status'
                                        }
                                    };
                                    if (!res1.name && nameHistory) {
                                        let newName = res2[res2.length - 1].name
                                        embedMessage.setTitle(newName).setDescription(newName + "'s profile");
                                        embedMessage.fields[0].value = newName;
                                    }
                                    msg.channel.send({ embed: embedMessage });
                                });
                            }
                        });
                        /*let playerUrl = 'https://minecraft-statistic.net/api/player/info/' + name;
                        fetch(playerUrl, { method: "Get" })
                            .then(res => res.json())
                            .then((json) => {
                                console.log(json);
                                if (json.msg) {
                                    msg.reply(json.msg);
                                }
                                else {
                                    let response = `${name}(${json.data.uuid}) is `;
                                    if (json.data.online) {
                                        response += 'online';
                                    }
                                    else {
                                        response += 'offline';
                                    }
                                    response += `. Total time played: `;
                                    if (json.data.total_time_play > 0) {
                                        if (json.data.total_time_play >= 60) {
                                            response += Math.floor(json.data.total_time_play / 60) + ' hours';
                                            if ((json.data.total_time_play % 60) > 0) {
                                                response += ' and ' + json.data.total_time_play % 60 + ' minutes.';
                                            }
                                            else {
                                                response += '.';
                                            }
                                        }
                                        else {
                                            response += json.data.total_time_play + ' minutes.';
                                        }
                                    }
                                    else {
                                        response += 'none.';
                                    }
                                    let lastTimePlayed = new Date(json.data.last_play * 1000);
                                    response += ' Last time played: ' + lastTimePlayed.toUTCString();
                                    msg.reply(response);
                                }
                            });*/
                        break;
                    case 'uuid':
                        if (args.length < 2) {
                            msg.reply("please specify the player's name");
                            return;
                        }
                        else if (args[1].includes('à') || args[1].includes('è') || args[1].includes('ì') || args[1].includes('ò') || args[1].includes('ù') || args[1].includes('À') || args[1].includes('È') || args[1].includes('Ì') || args[1].includes('Ò') || args[1].includes('Ù') || args[1].includes('#') || args[1].includes('&') || args[1].includes('\\') || args[1].includes('/')) {
                            msg.reply('invalid characters');
                            break;
                        }
                        mojang.nameToUuid(args[1], function (err, res) {
                            if (err) console.log(err);
                            if (res[0] !== undefined) {    
                                msg.reply(res[0].name + '\'s uuid is ' + res[0].id);
                            }
                            else msg.reply('player ' + args[1] + ' does not exist');
                        });
                        break
                    case 'prefix':
                        if (args.length < 2) {
                            msg.reply("this server's prefix is " + prefix);
                            return;
                        }
                        if (args[1].length > 2) {
                            msg.reply('prefix is too long. Max length: 2 characters');
                            return;
                        }
                        let setPrefix = function (guildId, prefix) {
                            return new Promise((resolve, reject) => {
                                let queryCode = mysql.format(`UPDATE guilds SET prefix = '${prefix}' WHERE guild_id = ${guildId}`);
                                database.query(queryCode, function (err, result, fields) {
                                    if (!err) resolve(msg.channel.send('Prefix updated successfully. New prefix: ' + prefix));
                                    else reject(err);
                                });
                            });
                        }
                        setPrefix(guildId, args[1]);
                }
            }
            else if (msg.content[0] === '!') {
                let args = msg.content.slice(1).split(" ");
                let command = args[0].toLowerCase();
                switch (command) {
                    case 'help':
                        if (args.length < 2 || args[1] == 1) {
                            msg.channel.send(`Help page 1/3:
                                \n${prefix}ping: Returns the response time between when the command is received and when the answer is sent\n${prefix}/!help [page]: Displays the commands list with a description. Works with both default and custom prefix\n${prefix}prefix [new prefix]: Shows the current prefix. Works with both default and custom prefix. If an  argument is specified, sets the custom prefix to that argument. Works only with custom prefix`);
                        }
                        else if (args[1] == 2) {
                            msg.channel.send(`Help page ${args[1]}/3:
                                \n${prefix}server <ip address>: Check server's online status and players`);
                        }
                        else if (args[1] == 3) {
                            msg.channel.send(`Help page ${args[1]}/3:
                                \n${prefix}uuid <name>: Diplays player's uuid\n${prefix}player <uuid>: Diplays player's name, uuid, skin, cape and name history`);
                        }
                        else msg.channel.send('Invalid page');
                        break;
                    case 'prefix':
                        if (args.length < 2) {
                            msg.channel.send("This server's prefix is " + prefix);
                        }
                        break;
                }
            }
        });
});
client.login(token);
