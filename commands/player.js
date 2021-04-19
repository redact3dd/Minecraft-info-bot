const mojang = require('mojang-api');
const https = require('https');

module.exports = {
    name: 'player',
    description: 'Diplays player\'s name, uuid, skin, cape and name history',
    args: '<uuid/name>',
    execute(message, args) {
        //check that a value is sent
        if(!args.length) {
            message.reply('please specify the player\'s uuid');
            return;
        }
        //get uuid
        this.getUuid(args[0], (err, uuid) => {
            if(err) {
                message.channel.send('An error occurred. This might be because the player does not exist');
                return;
            }
            //check that uuid exists
            mojang.profile(uuid, (err, resp) => {
                if(err) {
                    message.reply('that player\'s uuid does not exist');
                    return;
                }
                //get name history
                mojang.nameHistory(uuid, (err, resp1) => {
                    if(err) {
                        message.reply('there was an error trying to retrieve the data');
                        console.log(err);
                        return;
                    }
                    let nameHistory = [];
                    resp1.forEach(element => {
                        nameHistory.push(element.name);
                    });
                    nameHistory = nameHistory.join(', ');
                    //create embed message
                    let embedMessage = {
                        color: '#00b300',
                        title: resp.name,
                        author: {
                            name: 'Minecraft info',
                            url: 'https://github.com/Jystro/Minecraft-info-bot'
                        },
                        description: resp.name + "'s profile",
                        thumbnail: {
                            url: 'https://crafatar.com/avatars/' + resp.id + '.png?overlay'
                        },
                        fields: [{
                            name: 'Name',
                            value: resp.name
                        },
                        {
                            name: 'UUID',
                            value: resp.id
                        },
                        {
                            name: 'Skin',
                            value: 'https://crafatar.com/skins/' + resp.id + '.png'
                        }],
                        image: {
                            url: 'https://crafatar.com/renders/body/' + resp.id + '.png?overlay'
                        },
                        timestamp: new Date(),
                        footer: {
                            text: 'Minecraft info bot\nData updated every 20 minutes'
                        }
                    };
                    //check if cape exists
                    let cape = 'https://crafatar.com/capes/' + resp.id + '.png';
                    const req = https.request(cape, res => {
                        if(res.statusCode == 200) {
                            embedMessage.fields.push({ name: 'Cape', value: cape });
                        }
                        embedMessage.fields.push({ name: 'Name history', value: nameHistory });
                        //send embed
                        message.channel.send({  embed: embedMessage  });
                    });
                    req.on('error', err => {
                        console.log(err);
                        message.reply('there was an error while retrieving the cape');
                    })
                    req.end();
                });
            });
        });
        
    },
    //function to get uuid from uuid/name
    getUuid(value, cb) {
        let error = false;
        let regex = /^[a-f0-9]{32}$/i //regex for uuids
        if(!value.match(regex)) {
            mojang.nameToUuid(value, (err, resp) => {
                if(err || !resp.length) {
                    error = true;
                    cb(error, null);
                    return;
                }
                cb(error, resp[0].id);
            });
        }
        else { cb(error, value); }
    }
}
