module.exports = {
    name: 'install',
    description: 'the link where you can install the bot or add it to your server',
    execute(message) {
        message.channel.send('You can install the bot or add it to your server here https://github.com/Jystro/Minecraft-info-bot/blob/master/README.md#installation');
    }
}