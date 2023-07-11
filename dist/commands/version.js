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
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const data = new discord_js_1.SlashCommandBuilder()
    .setName('version')
    .setDescription('Sends the current bot version and available updates');
exports.data = data;
function execute(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        yield interaction.deferReply();
        const req = (0, node_https_1.request)('https://github.com/Jystro/Minecraft-info-bot/releases/latest', res => {
            var _a;
            interaction.editReply(`Current version is ${JSON.parse((0, node_fs_1.readFileSync)((0, node_path_1.join)(__dirname, '../../package.json')).toString()).version}. Latest version is ${(_a = res.headers.location) === null || _a === void 0 ? void 0 : _a.split('/').pop()}`);
        });
        req.on('error', console.error);
        req.end();
    });
}
exports.execute = execute;
