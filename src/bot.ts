import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';
import { spawn } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';

dotenv.config();

const child = spawn('node', ['dist/deploy-commands.js']);

child.stdout.setEncoding('utf-8');
child.stdout.on('data', data => {
	console.log('[deploy-commands]: ', data);
});

child.stderr.setEncoding('utf-8');
child.stderr.on('data', data => {
	console.log('[deploy-commands]: ', data);
});


const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}


client.once(Events.ClientReady, c => {
	console.log(`${c.user.tag} ready!`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		try {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
		catch {
			await interaction.editReply({ content: 'There was an error while executing this command!' });
		}
	}
});


client.login(process.env.DISCORD_TOKEN);