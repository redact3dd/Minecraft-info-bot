import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
	.setName('help')
	.setDescription('Replies with the list of commands')

async function execute(interaction: ChatInputCommandInteraction) {
	await interaction.reply('All commands are available at https://github.com/Jystro/Minecraft-info-bot#commands');
};

export { data, execute }