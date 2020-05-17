/* eslint-disable indent */
import * as discord from 'discord.js';
import * as fs from 'fs';

import { Command } from '../types/types';

export default class MostSpeaker implements Command {
  readonly name: string = 'test';
  readonly description: string = '';

  public async execute(message: discord.Message): Promise<void> {
    const timeStamp: number = Date.now() - 1000 * 60 * 60 * 24 * 30 * 3;

    await message.channel.send(
      'Ok, je vais chercher les mollusques causeurs au fond de la mer'
    );

    const users: Map<discord.User, number> = new Map();
    message.guild.members.cache.map((member) => users.set(member.user, 0));

    const channels = message.guild.channels.cache.filter(
      (channel) => channel.type == 'text'
    );

    await Promise.all(
      channels.map(async (channel) => {
        let lastMessage: discord.Message = null;
        let options: discord.ChannelLogsQueryOptions = { limit: 100 };
        do {
          let messages = await (channel as discord.TextChannel).messages.fetch(
            options
          );

          messages.map((message) => {
            users.set(message.author, users.get(message.author) + 1);
          });

          lastMessage = messages.last();
          try {
            options.before = lastMessage.id;
          } catch {
            break;
          }
        } while (lastMessage.createdTimestamp > timeStamp);
        console.log('');
      })
    );

    await message.channel.send('Je remonte à la surface !');
    const mostSpeaker = new Map(
      [...users.entries()].sort((a, b) => a[1] - b[1])
    );

    let membersArr = Array.from(mostSpeaker.entries()).sort(
      (a, b) => b[1] - a[1]
    );

    console.log('finally =>' + membersArr[0]);

    await message.channel.send(
      `Et voila ! Le mollusque causeur des 3 derniers mois est <@${membersArr[0][0].id}>`
    );
  }

  public help(): string {
    return 'Display pong';
  }
}
