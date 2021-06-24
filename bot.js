'use strict'
require('dotenv').config();

const Discord = require('discord.js');
const fs = require('fs');

//create servers.json if it doesn't exist
if(!fs.existsSync('./servers.json')) {
    console.log('servers.json does not exist');
    console.log('Creating servers.json...');
    fs.writeFileSync('./servers.json', '{}', err => {
        console.error(err);
    });
    console.log('Success!');
}
//create .env if it doesn't exist
if(!fs.existsSync('./.env')) {
    console.log('.env does not exist');
    console.log('Creating .env...');
    fs.writeFileSync('./.env', 'DISCORD_TOKEN=', err => {
        console.error(err);
    });
    console.log('Success!');
    console.log('Please, insert your token in .env and restart the bot');
}

const servers = require('./exports/exports.js');
const defaultPrefix = require('./config.json').defaultPrefix;

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const command = require('./commands/' + file);
    client.commands.set(command.name, command);
}


client.once('ready', () => {
    //set up status
    client.user.setStatus('online');
    client.user.setActivity(defaultPrefix + 'help', {  type: 'LISTENING'  });
    console.log('Ready!');
});


client.on('message', message => {
    //check that author isn't a bot
    if (message.author.bot) return;
    //get prefix from servers.json
    let prefix = servers.getPrefix(message.guild.id);
    //check if message is a command
    if(message.content.toLowerCase().startsWith(prefix)) {
        //get arguments.args[0] === command name
        const args = message.content.toLowerCase().slice(prefix.length).split(' ');
        //check if command exists
        if(!client.commands.has(args[0])) return;
        //execute command
        try {
            client.commands.get(args[0]).execute(message, args.slice(1, args.length), prefix);
        }
        catch(err) {
            console.error(err);
            message.reply('Something went wrong while executing that command');
        }
    }
    //safe commands, to retrieve the prefix if forgotten
    else if(message.content.toLowerCase().startsWith(defaultPrefix + 'help')) {
        //get arguments
        const args = message.content.toLowerCase().slice(prefix.length).split(' ');
        try {
            client.commands.get('help').execute(message, args.slice(1, args.length), prefix);
        }
        catch(err) {
            message.reply('Something went wrong while executing that command');
        }
    }
});


client.login(process.env.DISCORD_TOKEN);