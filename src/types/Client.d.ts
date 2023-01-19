import { Client, Collection } from "discord.js";

declare module "discord.js" {
	interface Client {
		commands: Collection
	}
}