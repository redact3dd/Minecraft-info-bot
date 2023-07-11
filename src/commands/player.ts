import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { request } from "node:https"

type UuidResponse = {
	id?: string,
	name?: string,
	properties?: Array<Object>
};

const data = new SlashCommandBuilder()
	.setName('player')
	.setDescription('Gives informations about players')
	.addStringOption(option =>
		option.setName('uuid')
			.setDescription('The uuid of the player')
			.setRequired(true));

async function execute(interaction: ChatInputCommandInteraction) {
	await interaction.deferReply();

	const uuid = interaction.options.getString('uuid', true);

	const req = request({
		hostname: 'sessionserver.mojang.com',
		path: '/session/minecraft/profile/' + encodeURIComponent(uuid),
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	}, res => {

		let data: string = '';

		res.on('data', (chunk) => {
			data += chunk;
		});

		res.once('end', () => {
			const response = JSON.parse(data);
			if (res.statusCode !== 200) {
				console.error(response);
				return interaction.editReply('The uuid does not exist');
			}

			const embed = new EmbedBuilder()
				.setColor('#00b300')
				.setTitle(response.name ?? null)
				.setAuthor({ name: 'Minecraft info', url: 'https://github.com/Jystro/Minecraft-info-bot' })
				.setDescription(response?.name + ' profile')
				.setThumbnail('https://crafatar.com/avatars/' + uuid + '.png?overlay')
				.setFields([
					{
						name: 'Name',
						value: response?.name ?? "unknown"
					},
					{
						name: 'UUID',
						value: uuid
					},
					{
						name: 'Skin',
						value: 'https://crafatar.com/skins/' + response.id + '.png'
					}
				])
				.setImage('https://crafatar.com/renders/body/' + response.id + '.png?overlay')
				.setTimestamp(new Date())
				.setFooter({ text: 'Minecraft info bot\nData updated every 20 minutes' });

			let capeUrl = 'https://crafatar.com/capes/' + response.id + '.png';
			const capeReq = request(capeUrl, res => {
				if (res.statusCode === 200) {
					embed.addFields({ name: 'Cape', value: capeUrl });
				}
			});
			capeReq.on('error', err => {
				console.log(err);
				interaction.editReply('There was an error retrieving the cape');
			});
			capeReq.end();
			interaction.editReply({ embeds: [embed] });
		});
	});
	req.on('error', console.error);
	req.end();
}

export { data, execute }