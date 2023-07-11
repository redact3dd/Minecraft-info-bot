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
const data = new discord_js_1.SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with the response time');
exports.data = data;
function execute(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        yield interaction.reply('Pong').then(() => {
            const ping = interaction.createdTimestamp;
            interaction.fetchReply().then(response => {
                const pong = response.createdTimestamp;
                interaction.editReply(`Response time: ${pong - ping}ms`);
            });
        });
    });
}
exports.execute = execute;
