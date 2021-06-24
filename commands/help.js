const defaultPrefix = require('../config.json').defaultPrefix;

module.exports = {
    name: 'help',
    description: 'Shows a help message',
    args: '[command]',
    execute(message, args, prefix) {
        const response = [];
        const {  commands  } = message.client;
        //send all commands if there are no arguments
        if(!args.length) {
            //fill response message
            response.push(`Server\'s prefix: ${prefix}`);
            response.push(`Default prefix: ${defaultPrefix}`);
            response.push('Commands: ');
            response.push(commands.map(command => command.name).join(', '));
            //send response
            return message.author.send(response, {  split: true  })
                .then(() => {
                    //tell user the repsonse is in the DMs if the command's been sent in a server
                    if(message.channel.type === 'dm') return;
                    message.reply('check your DMs for a full list of commands');
                })
                .catch(error => {
                    message.reply('please be sure to activate DMs from this server\'s members');
                })
        }
        //get requested command
        const command = commands.get(args[0]);
        //check if command exists
        if(!command) return message.reply(command + ' does not exist');
        //fill response message
        response.push('Name: ' + command.name);
        response.push('Description: ' + command.description);
        let usage = 'Usage: ' + prefix + command.name;
        //add arguments to usage
        if(command.args) usage += ' ' + command.args;
        response.push(usage);
        //send response
        message.channel.send(response, {  split: true  });
    }
}