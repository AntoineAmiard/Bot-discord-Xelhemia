/* eslint-disable indent */
import * as discord from "discord.js";
import * as fs from "fs";
import * as json from "../config/list.json";

import { Command } from "../types/types";

export default class MostSpeaker implements Command {
  readonly name: string = "causeurs";
  readonly description: string = "";

  public async execute(message: discord.Message): Promise<void> {
    if (!json.whitelist.includes(message.author.id)) {
      await message.channel.send(
        "Vous n'êtes pas autorisé a utiliser cette commande"
      );
      return;
    }

    const timeStamp: number = Date.now() - 1000 * 60 * 60 * 24 * 30 * 3;
    const cristal = message.guild.emojis.cache.get("665132320595902481");
    const poulpe = message.guild.emojis.cache.get("695904787564068874");
    const role = message.guild.roles.cache.get("708618412561137735");
    const generalChannel = message.guild.channels.cache.get(
      "546411892793540609"
    ) as discord.TextChannel;

    await generalChannel.send(
      `Ok, je vais chercher les mollusques causeurs au fond de la mer ${poulpe}`
    );

    const users: Map<discord.GuildMember, number> = new Map();
    message.guild.members.cache.map((member) => users.set(member, 0));

    const channels = message.guild.channels.cache.filter(
      (channel) => channel.type == "text"
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
            users.set(message.member, users.get(message.member) + 1);
          });

          lastMessage = messages.last();
          try {
            options.before = lastMessage.id;
          } catch {
            break;
          }
        } while (lastMessage.createdTimestamp > timeStamp);
      })
    );

    await generalChannel.send(`Je remonte à la surface ! ${poulpe}`);
    const mostSpeaker = new Map(
      [...users.entries()].sort((a, b) => a[1] - b[1])
    );

    let membersArr = Array.from(mostSpeaker.entries()).sort(
      (a, b) => b[1] - a[1]
    );

    let list: Array<Object> = [];
    let max = 15;
    for (let i = 0; i < max; i++) {
      const user = membersArr[i];

      if (!json.blacklist_causeur.includes(user[0].user.id)) {
        user[0].roles.add(role);
        list.push({
          name: `    ----------------- `,
          value: `${cristal} <@${user[0].user.id}>`,
        });
      } else {
        max++;
      }
    }

    const embed = {
      title: `${cristal} Voici les 15 mollusques causeurs de ces 3 derniers mois ! ${poulpe}`,
      color: 0xe7a3ff,
      fields: list,
    };
    await generalChannel.send({ embed: embed });
  }

  public help(): string {
    return "Display pong";
  }
}
