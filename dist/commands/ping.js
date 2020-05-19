"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ping {
    constructor() {
        this.name = "ping";
        this.description = "";
    }
    async execute(message) {
        const users = Array.from(message.guild.members.cache);
        const cristal = message.guild.emojis.cache.get("665132320595902481");
        const poulpe = message.guild.emojis.cache.get("695904787564068874");
        let list = [];
        users.slice(0, 14).forEach((user, index) => list.push({
            name: `    ----------------- `,
            value: `${cristal} <@${user[1].id}>`,
        }));
        const embed = {
            title: `${cristal} Voici les 15 mollusques causeurs de ces 3 derniers mois ! ${poulpe}`,
            color: 0xe7a3ff,
            fields: list,
        };
        await message.channel.send({ embed: embed });
    }
    help() {
        return "Display pong";
    }
}
exports.default = Ping;
//# sourceMappingURL=ping.js.map