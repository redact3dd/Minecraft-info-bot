module.exports = {
    name: 'repo',
    description: 'Link to the bot\'s repository',
    execute(message) {
        message.channel.send('This project is open-source and available at https://github.com/Jystro/Minecraft-info-bot');
    }
}