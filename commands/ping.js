module.exports = {
    name: 'ping',
    description: 'Bot\'s response time. Commands that rely on other websites may take more time',
    execute(message) {
        let currentTime = Date.now();
        let ping = message.createdTimestamp - currentTime;
        message.channel.send('Response time: ' + ping + 'ms');
        console.log(`Response time in ${message.guild.region}: ${ping}ms`);
    }
}