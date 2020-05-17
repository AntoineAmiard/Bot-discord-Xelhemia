"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("./config/config.json");
const discord = require("discord.js");
const fs = require("fs");
class Bot {
    constructor(token, prefix) {
        this.client = new discord.Client();
        this.commands = [];
        this.token = token;
        this.prefix = prefix;
    }
    run() {
        this.loadCommands();
        this.client.on('ready', () => {
            console.log(`Logged in as ${this.client.user.tag}`);
        });
        this.client.on('message', async (message) => {
            if (message.author.bot || !message.content.startsWith(this.prefix)) {
                return;
            }
            const args = message.content.slice(this.prefix.length).split(' ');
            const commandName = args.shift().toLowerCase();
            let commandFound = false;
            this.commands.map(async (command) => {
                if (command.name == commandName) {
                    commandFound = true;
                    await command.execute(message, args);
                    return;
                }
            });
            if (!commandFound) {
                await message.channel.send(`Command **${commandName}** not found`);
            }
        });
        this.client.login(config.token);
    }
    loadCommands() {
        const commandFiles = fs
            .readdirSync(`${__dirname}/commands/`)
            .filter((file) => file.endsWith('.js'));
        for (const file of commandFiles) {
            const CmdClass = require(`./commands/${file}`).default;
            const command = new CmdClass();
            this.commands.push(command);
            console.log(`Command ${command.name} has been loaded succesfully`);
        }
    }
}
exports.default = Bot;
//# sourceMappingURL=bot.js.map