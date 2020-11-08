const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

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
        //create new XMLHttpRequest
        const xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = () => {
            //check that response is complete
            if(xmlHttp.readyState === 4) {
                //create obj from response
                const resp = JSON.parse(xmlHttp.responseText);
                //check that hostname exists
                if(!resp.hostname) {
                    message.channel.send('Couldn\'t find any server with ip ' + args[0]);
                    return;
                }
                //create answer message
                let response = resp.hostname;
                if(resp.online) {
                    response += ' is online. Online players: ';
                    if(resp.players.online) {
                        response += resp.players.online;
                    }
                    else {
                        response += 'none';
                    }
                }
                else {
                    response += ' is offline'
                }
                //send answer
                message.channel.send(response);
            }
        }
        //open and send xhr
        xmlHttp.open('GET', 'https://api.mcsrvstat.us/2/' + args[0]);
        xmlHttp.send();
    }
}