const mojang = require('mojang-api');

module.exports = {
    name: 'player',
    description: 'Diplays player\'s name, uuid, skin, cape and name history',
    args: '<uuid/name>',
    execute(message, args) {
        //check that the uuid is sent
        if(!args.length) {
            message.reply('please specify the player\'s uuid');
            return;
        }
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

                    let nameHistory = '';
                    resp1.forEach(element => {
                        nameHistory += element.name + ', ';
                    });
                    nameHistory = nameHistory.slice(0, nameHistory.length - 2);
                    //create embed message
                    let embedMessage = {
                        color: '#00b300',
                        title: resp.name,
                        author: {
                            name: 'Minecraft info',
                            icon_url: '',
                            url: 'https://github.com/Jystro/Minecraft-info-bot'
                        },
                        description: resp.name + "'s profile",
                        thumbnail: {
                            url: 'https://crafatar.com/avatars/' + resp.id + '.png' + '?overlay'
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
                        },
                        {
                            name: 'Cape',
                            value: 'https://crafatar.com/capes/' + resp.id + '.png'
                        },
                        {
                            name: 'Name history',
                            value: nameHistory
                        }],
                        image: {
                            url: 'https://crafatar.com/renders/body/' + resp.id + '.png' + '?overlay'
                        },
                        timestamp: new Date(),
                        footer: {
                            text: 'Minecraft info bot'
                        }
                    };
                    //send embed
                    message.channel.send({  embed: embedMessage  });
                });
            });
        });
        
    },
    getUuid(value, cb) {
        let uuid = value;
        let error = false;
        let regex = /[a-f0-9]/gi
            if(value.match(regex).length !== 32 && value.length !== 32) {
                mojang.nameToUuid(uuid, (err, resp) => {
                    if(err || !resp.length) {
                        error = true;
                        cb(error, null);
                        return;
                    }
                    uuid = resp[0].id;
                    cb(error, uuid);
                });
            }
            else { cb(error, uuid); }
    }
}
