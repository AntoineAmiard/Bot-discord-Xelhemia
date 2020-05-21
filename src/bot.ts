import * as config from './config/config.json';
import * as discord from 'discord.js';
import * as fs from 'fs';

import { Command } from './types/types';

export default class Bot {
  private token: string;
  private client: discord.Client = new discord.Client();
  private commands: Command[] = [];
  private prefix: string;

  constructor(token: string, prefix: string) {
    this.token = token;
    this.prefix = prefix;
  }

  public run(): void {
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

  private loadCommands(): void {
    const commandFiles: string[] = fs
      .readdirSync(`${__dirname}/commands/`)
      .filter((file) => file.endsWith('.js'));

    for (const file of commandFiles) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const CmdClass = require(`./commands/${file}`).default;
      const command = new CmdClass() as Command;
      this.commands.push(command);
      console.log(`Command ${command.name} has been loaded succesfully`);
    }
  }
}
