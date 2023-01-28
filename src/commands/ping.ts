import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with the response time')

async function execute(interaction: ChatInputCommandInteraction) {
	await interaction.reply('Pong').then(() => {
		const ping = interaction.createdTimestamp;
		interaction.fetchReply().then(response => {
			const pong = response.createdTimestamp;
			interaction.editReply(`Response time: ${pong - ping}ms`);
		})
	});
}

export { data, execute }