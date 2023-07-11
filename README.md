# Minecraft info bot
**[Discord](https://discord.gg/sBMGYXh)** **[Download](#installation)**

###### This project is not releated  to Mojang and respects it's guidelines. Minecraft is a trademark of Mojang Synergies AB.
**Minecraft info** is a Discord bot written 100% in TypeScript

**Please note**: information like the bot's token has been removed. Start the program for the first time to generate a .env file and insert your token in it or set the DISCORD_TOKEN variable in your environment


## Commands
### **help**
Displays this page

Usage: !help<br><br>
****

### **install**
Sends the link to the installation paragraph of this file

Usage: !install<br><br>
****

### **ping**
Returns the response time between when the command is received and when the answer is sent

Usage: !ping<br><br>
****

### **player**
Displays player's name, uuid, skin, cape

Note: Name history is no longer supported as Mojang have removed it from their API

Usage: !player \<uuid/name><br><br>
****

### **repo**
Sends the link to this repository

Usage: !repo<br><br>
****

### **server**
Gives information about the specified minecraft server

Usage: !server \<ip address><br><br>
****

### **uuid**
Displays the uuid associated with the specified player name

Usage: !uuid \<name><br><br>
****

### **version**
Returns the bot's version

Usage: !version<br><br><br><br>

## Installation
You can [download](https://github.com/Jystro/Minecraft-info-bot/archive/master.zip) the bot files locally and host it on your own using Node or [add the already hosted bot](https://discord.com/api/oauth2/authorize?client_id=728958101499150397&permissions=125952&scope=bot)
### Git and Node
These steps are the same for both git and downloading a .zip archive
1. Download the repository using git with `git clone https://github.com/Jystro/Minecraft-info-bot` or by [downloading a zip file](https://github.com/Jystro/Minecraft-info-bot/archive/master.zip) and unzipping it
2. Open a terminal in the directory of the package.json file
3. Run the command `npm install` to download the necessary packages
4. Run `npm start` afterwards to start the bot. The first time the bot will generate some files and shut down
5. Follow the instructions and set the env variable DISCORD_TOKEN to your token or write it in the `.env` file. You can get a token [here](https://discord.com/developers/applications/)
6. Restart the bot once the token is set to login to Discord


### Docker
If you have Docker installed on your machine, clone the repository and build the image from Dockerfile. [Docker-compose.yml](https://github.com/Jystro/Minecraft-info-bot/blob/v3.0.1/docker-compose.yml) example is also available

Otherwise,

Remember to set the DISCORD_TOKEN and DISCORD_CLIENTID environmental variables and to create a volume for presistent data. You can find the Client_id by activating developer settings in Discord and right clicking the bot's profile -> Copy User Id

If you need help with the bot, join the [Discord server](https://discord.gg/sBMGYXh)

## Contributing
If you wish to contribute to this repository please fork it

## Acknowledgments
* Servers' info: [Minecraft Server Status](https://mcsrvstat.us/)
* Skins and avatars: [Crafatar](https://crafatar.com)