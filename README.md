# Minecraft info bot
**[Discord](https://discord.gg/sBMGYXh)**

###### This project is not releated  to Mojang and respects it's guidelines. Minecraft is a trademark of Mojang Synergies AB.
**Minecraft info** is a Discord bot written 100% in Node.js.

**Please note**: information like the bot's token has been removed. Start the program for the first time to generate a .env file and insert your token in it.

Default prefix: !

## Commands
* **ping**: Returns the response time between when the command is received and when the answer is sent.

Usage:
!ping
****
* **help**: Displays the command list. If a command is specified, gives additional info about the command. The command always works even with the default prefix.

Usage:
!help \[command]
****
* **prefix**: Displays the current prefix for the server. If an argument is specified, changes the server's prefix into the argument.

Usage:
!prefix \[new prefix]
****
* **server**: Checks server's online status and online players.

Usage:
!server \<ip address>
****
* **uuid**: Displays the uuid of the specified player.

Usage:
!uuid \<name>
****
* **player**: Displays player's name, uuid, skin, cape and name history.

Usage:
!player \<uuid>

# Acknowledgments

* Servers' info: [Minecraft Server Status](https://mcsrvstat.us/)
* Skins and avatars: [Crafatar](https://crafatar.com)

# Libraries
* [discord.js](https://www.npmjs.com/package/discord.js)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [Mojang API](https://www.npmjs.com/package/mojang-api)
* [xmlhttprequest](https://www.npmjs.com/package/xmlhttprequest)