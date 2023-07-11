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
    .setName('uuid')
    .setDescription('Finds a player\'s uuid from the nickname')
    .addStringOption(option => option.setName('names')
    .setDescription('The list of usernames, separated by comma, to search for')
    .setRequired(true));
exports.data = data;
function execute(interaction) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        yield interaction.deferReply();
        const usernames = (_a = interaction.options.getString('names')) === null || _a === void 0 ? void 0 : _a.split(',').map(e => e.trim());
        const req = (0, node_https_1.request)({ hostname: 'api.mojang.com', path: '/profiles/minecraft', method: 'POST', headers: { 'Content-Type': 'application/json' } }, res => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.once('end', () => {
                const response = JSON.parse(data);
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
    });
}
exports.execute = execute;
