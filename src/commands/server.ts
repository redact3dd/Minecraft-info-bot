import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { request } from "node:https";

type Server = {
	ip?: string,
	motd: {
		clean: string[]
	}
	players: {
		online: number,
		max: number
	},
	version: string,
	online: boolean,
	hostname: string,
	plugins: {
		names: string[]
	},
	mods: {
		names: string[]
	}
};

const data = new SlashCommandBuilder()
	.setName('server')
	.setDescription('Check server\'s online status and players. Data is updated every 5 minutes')
	.addStringOption(option =>
		option.setName('ip')
			.setDescription('The ip address of the server')
			.setRequired(true));

async function execute(interaction: ChatInputCommandInteraction) {
	await interaction.deferReply();
	const req = request('https://api.mcsrvstat.us/2/' + interaction.options.getString('ip', true), res => {
		let data = '';
		res.on('data', chunk => {
			data += chunk;
		});
		res.once('end', () => {
			const response: Server = JSON.parse(data);
			let embed = new EmbedBuilder()
				.setColor(0x00b300)
				.setTitle(response.hostname ?? interaction.options.getString('ip', true))
				.setAuthor({ name: 'Minecraft info', url: 'https://github.com/Jystro/Minecraft-info-bot' })
				.setThumbnail('https://api.mcsrvstat.us/icon/' + response.hostname)
				.setImage('https://api.mcsrvstat.us/icon/' + response.hostname)
				.setTimestamp(new Date())
				.setFooter({ text: 'Minecraft info bot\nData is updated every 5 minutes' })

			if (response.online) {
				embed.setFields(
					{ name: 'Status', value: 'Online' },
					{ name: 'Motd', value: (response.motd) ? response.motd.clean.join('\n') : 'None' },
					{ name: 'Online players', value: response.players.online + '/' + response.players.max },
					{ name: 'Version', value: (Array.isArray(response.version)) ? response.version[0] : response.version },
					{ name: 'Plugins', value: (response.plugins) ? response.plugins.names.join(', ') : 'None' },
					{ name: 'Mods', value: (response.mods) ? response.mods.names.join(', ') : 'None' }
				);
			}
			else {
				embed.setFields(
					{ name: 'Status', value: 'Offline' }
				);
			}

			interaction.editReply({ embeds: [embed] })
		});
	});

	req.on('error', err => {
		console.error(err);
		interaction.editReply('There was an error trying to get the server\'s information');
	});

	req.end();
}

export { data, execute }