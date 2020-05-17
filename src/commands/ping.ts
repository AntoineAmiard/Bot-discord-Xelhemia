import * as discord from 'discord.js';

import { Command } from '../types/types';

export default class Ping implements Command {
  readonly name: string = 'ping';
  readonly description: string = '';

  public async execute(message: discord.Message): Promise<void> {
    await message.channel.send('Pong !');
  }

  public help(): string {
    return 'Display pong';
  }
}
