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
    .setName('player')
    .setDescription('Gives informations about players')
    .addStringOption(option => option.setName('uuid')
    .setDescription('The uuid of the player')
    .setRequired(true));
exports.data = data;
function execute(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        yield interaction.deferReply();
        const uuid = interaction.options.getString('uuid', true);
        const req = (0, node_https_1.request)({
            hostname: 'sessionserver.mojang.com',
            path: '/session/minecraft/profile/' + encodeURIComponent(uuid),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }, res => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.once('end', () => {
                var _a, _b;
                const response = JSON.parse(data);
                if (res.statusCode !== 200) {
                    console.error(response);
                    return interaction.editReply('The uuid does not exist');
                }
                const embed = new discord_js_1.EmbedBuilder()
                    .setColor('#00b300')
                    .setTitle((_a = response.name) !== null && _a !== void 0 ? _a : null)
                    .setAuthor({ name: 'Minecraft info', url: 'https://github.com/Jystro/Minecraft-info-bot' })
                    .setDescription((response === null || response === void 0 ? void 0 : response.name) + ' profile')
                    .setThumbnail('https://crafatar.com/avatars/' + uuid + '.png?overlay')
                    .setFields([
                    {
                        name: 'Name',
                        value: (_b = response === null || response === void 0 ? void 0 : response.name) !== null && _b !== void 0 ? _b : "unknown"
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
                const capeReq = (0, node_https_1.request)(capeUrl, res => {
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
    });
}
exports.execute = execute;
