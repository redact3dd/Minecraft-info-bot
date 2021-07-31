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
****
### **version**
Returns the bot's version

Usage:
!version
## Installation
You can [download](https://github.com/Jystro/Minecraft-info-bot/archive/master.zip) the bot files locally and host it on your own or [add the official one](https://discord.com/api/oauth2/authorize?client_id=728958101499150397&permissions=125952&scope=bot)
### Git and Node
These steps are the same for both git and downloading a .zip archive
1. Download the repository using git with `git clone https://github.com/Jystro/Minecraft-info-bot` or by [downloading a zip file](https://github.com/Jystro/Minecraft-info-bot/archive/master.zip) and unzipping it
2. Open a terminal in the directory of the package.json file
3. Run the command `bash node.sh`. The code will now create two files
4. You can set the env variable DISCORD_TOKEN to your token or write it after the = character in the `.env` file. You can get a token [here](https://discord.com/developers/applications/)
5. Run `bash node.sh` again
### Docker
If you have Docker installed on your machine, another option is to use a Dockerfile

There are two available options for Dockerfiles, the first being `Dockerfile.lightweight` and the second one `Dockerfile.standalone`. To install either of them, remove the extention and set the DISCORD_TOKEN environmental variable.

* Dockerfile.lightweight: lighter, requires the repository to be locally installed. Approximate size: 63.85 MB
* Dockerfile.standalone: doesn't require any additional file. Approximate size: 79 MB

To create a lightweight container called "minecraft-info-bot", edit `Dockerfile.lightweight` and add your token after the `DISCORD_TOKEN` variable. Execute `docker.sh` using bash and wait for the container to be up and running

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
