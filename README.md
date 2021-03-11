# Minecraft info bot
**[Discord](https://discord.gg/sBMGYXh)** **[Download](#installation)**

###### This project is not releated  to Mojang and respects it's guidelines. Minecraft is a trademark of Mojang Synergies AB.
**Minecraft info** is a Discord bot written 100% in Node.js

**Please note**: information like the bot's token has been removed. Start the program for the first time to generate a .env file and insert your token in it

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
Checks server's online status and online players

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
!player \<uuid>
****
### **install**
Sends the link to the installation paragraph of this file

Usage:
!install
## Installation
You can [download](https://github.com/Jystro/Minecraft-info-bot/archive/master.zip) the bot files locally and host it on your own or [add the official one](https://discord.com/api/oauth2/authorize?client_id=728958101499150397&permissions=125952&scope=bot)  
If you decide to download the files you need to do the following steps
1. Download the repository using git with `git clone https://github.com/Jystro/Minecraft-info-bot` or by [downloading a zip file](https://github.com/Jystro/Minecraft-info-bot/archive/master.zip)
2. Open a terminal in the directory of the package.json file
3. Run the command `npm install discord.js dotenv mojang-api xmlhttprequest`
4. Start the bot by typing `node .`. The code will now create three files
5. Open the file `.env` and write your token after the = character. You can get a token [here](https://discord.com/developers/applications/)
6. Run the `node .` command again and the bot will be up and running

If you need help with the bot, join the [Discord server](https://discord.gg/sBMGYXh)

## Acknowledgments
* Servers' info: [Minecraft Server Status](https://mcsrvstat.us/)
* Skins and avatars: [Crafatar](https://crafatar.com)

## Libraries
* [discord.js](https://www.npmjs.com/package/discord.js)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [mojang-api](https://www.npmjs.com/package/mojang-api)