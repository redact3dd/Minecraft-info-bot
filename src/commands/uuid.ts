import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { request } from "node:https";

type Uuid = {
	id?: string,
	name?: string
};

const data = new SlashCommandBuilder()
	.setName('uuid')
	.setDescription('Finds a player\'s uuid from the nickname')
	.addStringOption(option =>
		option.setName('names')
			.setDescription('The list of usernames, separated by comma, to search for')
			.setRequired(true));

async function execute(interaction: ChatInputCommandInteraction) {
	await interaction.deferReply();

	const usernames = interaction.options.getString('names')?.split(',').map(e => e.trim());

	const req = request({ hostname: 'api.mojang.com', path: '/profiles/minecraft', method: 'POST', headers: { 'Content-Type': 'application/json' } }, res => {

		let data: string = '';

		res.on('data', (chunk) => {
			data += chunk;
		});

		res.once('end', () => {
			const response: Uuid[] = JSON.parse(data);
			if (res.statusCode !== 200) {
				console.error(response);
				return interaction.editReply('One of the players does not exist');
			}

			response.forEach(e => {
				interaction.followUp(`Uuid of ${e.name} is ${e.id}`);
			});
		});
	});

	req.on('error', console.error);

	req.write(JSON.stringify(usernames));
	req.end();
}

export { data, execute }