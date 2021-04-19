module.exports = {
    name: 'provider',
    description: 'List of sites used to provide data',
    execute(message) {
        message.channel.send('Servers: https://mcsrvstat.us/ Players: https://crafatar.com');
    }
}