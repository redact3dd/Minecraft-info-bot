const https = require('https');

module.exports = {
    name: 'server',
    description: 'Check server\'s online status and players. Data is updated every 5 minutes',
    args: '<ip address>',
    execute(message, args) {
        //check if there're arguments
        if(!args.length) {
            message.reply('please specify the server\'s ip address');
            return;
        }
        //create new request
        const options = {
            hostname: 'api.mcsrvstat.us',
            port: 443,
            path: '/2/' + args[0],
            method: 'GET'
        }
        const request = https.request(options, response => {
            let str = '';
            response.on('data', data => {
                str += data;
            });
            response.on('end', () => {
                resp = JSON.parse(str);
                if(!resp.hostname) {
                    message.channel.send('Couldn\'t find any server with ip ' + args[0]);
                    return;
                }
                //create answer message
                let msg = resp.hostname;
                if(resp.online) {
                    msg += ' is online. Online players: ';
                    if(resp.players.online) {
                        msg += resp.players.online;
                    }
                    else {
                        msg += 'none';
                    }
                }
                else {
                    msg += ' is offline'
                }
                //send answer
                message.channel.send(msg);
            })
        });
        //error handling
        request.on('error', err => {
            console.log(err);
            message.channel.send('There was an error trying to get the server\'s information');
        })
        //close request
        request.end()
    }
}