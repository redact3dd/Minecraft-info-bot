const fs = require('fs');
const https = require('https');

module.exports = {
    name: 'version',
    description: 'Returns the bot\'s version',
    execute(message) {
        fs.readFile('package.json', (err, data) => {
            if(err) return message.channel.send('Error');
            data = JSON.parse(data);
            let msg = `This is version ${data.version}`;
            //array of every number in version without .
            let splittedVersion = data.version.split('.');
            //increment splittedVersion last digit
            let lastDigit = String(Number(splittedVersion.pop()) + 1);
            //add lastDigit to array
            splittedVersion.push(lastDigit);
            //readd the .
            let nextVersion = String(splittedVersion.join('.'));
            //request to GitHub nextVersion tag
            const req = https.request(`https://github.com/Jystro/Minecraft-info-bot/releases/tag/v${nextVersion}`, res => {
                if(res.statusCode == 200) {
                    msg += '. A new version is available. Update at https://github.com/Jystro/Minecraft-info-bot';
                }
                message.channel.send(msg);
            });
            req.on('error', err => {
                console.log(err);
                message.reply('there was an error while retrieving a possible new version');
            })
            req.end();
        });
    }
}