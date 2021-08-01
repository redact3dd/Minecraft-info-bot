module.exports = {
    name: 'ping',
    description: 'Bot\'s response time. Commands that rely on other websites may take more time',
    execute(message) {
        message.channel.send('Pong!')
            .then(response => {
                const pingTime = message.createdTimestamp;
                const pongTime = response.createdTimestamp;
                const ping = pongTime - pingTime;
                message.channel.send('Response time: ' + ping + 'ms')
                console.log(`Response time in ${message.guild.region}: ${ping}ms`);
            });
    }
}