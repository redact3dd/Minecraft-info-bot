"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.data = void 0;
const discord_js_1 = require("discord.js");
const node_https_1 = require("node:https");
const data = new discord_js_1.SlashCommandBuilder()
    .setName('server')
    .setDescription('Check server\'s online status and players. Data is updated every 5 minutes')
    .addStringOption(option => option.setName('ip')
    .setDescription('The ip address of the server')
    .setRequired(true));
exports.data = data;
function execute(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        yield interaction.deferReply();
        const req = (0, node_https_1.request)('https://api.mcsrvstat.us/2/' + interaction.options.getString('ip', true), res => {
            let data = '';
            res.on('data', chunk => {
                data += chunk;
            });
            res.once('end', () => {
                var _a;
                const response = JSON.parse(data);
                let embed = new discord_js_1.EmbedBuilder()
                    .setColor(0x00b300)
                    .setTitle((_a = response.hostname) !== null && _a !== void 0 ? _a : interaction.options.getString('ip', true))
                    .setAuthor({ name: 'Minecraft info', url: 'https://github.com/Jystro/Minecraft-info-bot' })
                    .setThumbnail('https://api.mcsrvstat.us/icon/' + response.hostname)
                    .setImage('https://api.mcsrvstat.us/icon/' + response.hostname)
                    .setTimestamp(new Date())
                    .setFooter({ text: 'Minecraft info bot\nData is updated every 5 minutes' });
                if (response.online) {
                    embed.setFields({ name: 'Status', value: 'Online' }, { name: 'Motd', value: (response.motd) ? response.motd.clean.join('\n') : 'None' }, { name: 'Online players', value: response.players.online + '/' + response.players.max }, { name: 'Version', value: (Array.isArray(response.version)) ? response.version[0] : response.version }, { name: 'Plugins', value: (response.plugins) ? response.plugins.names.join(', ') : 'None' }, { name: 'Mods', value: (response.mods) ? response.mods.names.join(', ') : 'None' });
                }
                else {
                    embed.setFields({ name: 'Status', value: 'Offline' });
                }
                interaction.editReply({ embeds: [embed] });
            });
        });
        req.on('error', err => {
            console.error(err);
            interaction.editReply('There was an error trying to get the server\'s information');
        });
        req.end();
    });
}
exports.execute = execute;
