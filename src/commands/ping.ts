import * as discord from "discord.js";

import { Command } from "../types/types";

export default class Ping implements Command {
  readonly name: string = "ping";
  readonly description: string = "";

  public async execute(message: discord.Message): Promise<void> {
    const users = Array.from(message.guild.members.cache);
    // const mRole = message.guild.roles.cache.get("708618412561137735")
    const cristal = message.guild.emojis.cache.get("665132320595902481");
    const poulpe = message.guild.emojis.cache.get("695904787564068874");
    let list: Array<Object> = [];
    users.slice(0, 14).forEach((user, index) =>
      list.push({
        name: `    ----------------- `,
        value: `${cristal} <@${user[1].id}>`,
      })
    );

    const embed = {
      title: `${cristal} Voici les 15 mollusques causeurs de ces 3 derniers mois ! ${poulpe}`,
      color: 0xe7a3ff,
      fields: list,
    };
    await message.channel.send({ embed: embed });
  }

  public help(): string {
    return "Display pong";
  }
}
