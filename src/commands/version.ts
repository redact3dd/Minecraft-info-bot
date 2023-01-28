import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { request } from "node:https";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const data = new SlashCommandBuilder()
	.setName('version')
	.setDescription('Sends the current bot version and available updates');

async function execute(interaction: ChatInputCommandInteraction) {
	await interaction.deferReply();

	let req = request('https://github.com/Jystro/Minecraft-info-bot/releases/latest', res => {
		interaction.editReply(`Current version is ${JSON.parse(readFileSync(join(__dirname, '../../package.json')).toString()).version}. Latest version is ${res.headers.location?.split('/').pop()}`);
	});

	req.on('error', err => {
		console.error(err);
	});
	req.end();
}

export { data, execute }