import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
	.setName('install')
	.setDescription('Provides a link to add the bot to your server')

async function execute(interaction: ChatInputCommandInteraction) {
	await interaction.reply('You can install the bot or add it to your server here https://github.com/Jystro/Minecraft-info-bot/blob/master/README.md#installation');
}

export { data, execute }