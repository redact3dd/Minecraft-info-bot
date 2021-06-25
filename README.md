# Minecraft info bot
**[Discord](https://discord.gg/sBMGYXh)** **[Download](#installation)**

###### This project is not releated  to Mojang and respects it's guidelines. Minecraft is a trademark of Mojang Synergies AB.
**Minecraft info** is a Discord bot written 100% in Node.js

**Please note**: information like the bot's token has been removed. Start the program for the first time to generate a .env file and insert your token in it or set the DISCORD_TOKEN variable in your environment

Default prefix: !

## Commands
### **ping**
Returns the response time between when the command is received and when the answer is sent

Usage:
!ping
****
### **help**
Displays the command list. If a command is specified, gives additional info about the command. The command always works even with the default prefix

Usage:
!help \[command]
****
### **prefix**
Displays the current prefix for the server. Can be used with the following arguments
* set \<prefix>: Changes the prefix if the user has the necessary permissions
* role: Lists all the roles who can manage the prefix
* role set \<@role> \[role...]: Resets the authorised roles and adds the specified ones
* role add \<@role> \[role...]: Adds the specified roles to the authorised roles
* role remove \<@role> \[role...]: Removes the specified roles from the authorised roles
* role clear: Removes all the roles from the authorised roles

Usage:
!prefix
****
### **server**
Gives information about the server

Usage:
!server \<ip address>
****
### **uuid**
Displays the uuid of the specified player

Usage:
!uuid \<name>
****
### **player**
Displays player's name, uuid, skin, cape and name history

Usage:
!player \<uuid/name>
****
### **install**
Sends the link to the installation paragraph of this file

Usage:
!install

****
### **repo**
Sends the link to this repository

Usage:
!repo
****
### **provider**
Sends the link to the services the bot uses

Usage:
!provider
## Installation
You can [download](https://github.com/Jystro/Minecraft-info-bot/archive/master.zip) the bot files locally and host it on your own or [add the official one](https://discord.com/api/oauth2/authorize?client_id=728958101499150397&permissions=125952&scope=bot)
### Git
These steps are the same for both git and downloading a .zip archive
1. Download the repository using git with `git clone https://github.com/Jystro/Minecraft-info-bot` or by [downloading a zip file](https://github.com/Jystro/Minecraft-info-bot/archive/master.zip) and unzipping it
2. Open a terminal in the directory of the package.json file
3. Run the command `npm install`
4. Start the bot by typing `npm start`. The code will now create two files
5. You can set the env variable DISCORD_TOKEN to your token or write it after the = character in the `.env` file. You can get a token [here](https://discord.com/developers/applications/)
6. Run the `node start` command again and the bot will be up and running
### Docker
If you have Docker installed on your machine, another option is to edit and use the Dockerfile.example. Just remove the extension and change the value of the DISCORD_TOKEN variable to your bot's token

One you're done, build your image with `docker build . --tag Your_image_name:Current_bot_version`

Then run it with `docker run Your_image_name:Current_bot_version`
<br><br>
If you need help with the bot, join the [Discord server](https://discord.gg/sBMGYXh)

## Contributing
If you wish to contribute to this repository, please follow the indications in [CONTRIBUTING.md](https://github.com/Jystro/Minecraft-info-bot/blob/master/CONTRIBUTING.md)

## Acknowledgments
* Servers' info: [Minecraft Server Status](https://mcsrvstat.us/)
* Skins and avatars: [Crafatar](https://crafatar.com)

## Libraries
* [discord.js](https://www.npmjs.com/package/discord.js)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [mojang-api](https://www.npmjs.com/package/mojang-api)
