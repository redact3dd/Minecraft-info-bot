import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
	.setName('repo')
	.setDescription('Replies with the source project for the bot')

async function execute(interaction: ChatInputCommandInteraction) {
	await interaction.reply('This project is open-source and available at https://github.com/Jystro/Minecraft-info-bot');
}

export { data, execute }