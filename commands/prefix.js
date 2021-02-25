const servers = require('../exports/exports.js');

module.exports = {
    name: 'prefix',
    description: 'Prefix releated commands',
    args: '[new prefix]',
    execute(message, args) {
        //send server's prefix if there're no arguments
        if(!args.length) {
            message.channel.send('This server\'s prefix is ' + servers.getPrefix(message.guild.id));
            return;
        }
        //set new prefix if there are arguments
        servers.setPrefix(message.guild.id, args[0])
        .then(response => {
            message.channel.send(response);
        })
        .catch(err => {
            message.channel.send('There was an error while trying to change prefix. Please check the github page to open an issue or join the Discord server');
            console.error(err);
        });
    }
}