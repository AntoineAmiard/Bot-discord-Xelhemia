"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MostSpeaker {
    constructor() {
        this.name = 'test';
        this.description = '';
    }
    async execute(message) {
        const timeStamp = Date.now() - 1000 * 60 * 60 * 24 * 30 * 3;
        await message.channel.send('Ok, je vais chercher les mollusques causeurs au fond de la mer');
        const users = new Map();
        message.guild.members.cache.map((member) => users.set(member.user, 0));
        const channels = message.guild.channels.cache.filter((channel) => channel.type == 'text');
        await Promise.all(channels.map(async (channel) => {
            let lastMessage = null;
            let options = { limit: 100 };
            do {
                let messages = await channel.messages.fetch(options);
                messages.map((message) => {
                    users.set(message.author, users.get(message.author) + 1);
                });
                lastMessage = messages.last();
                try {
                    options.before = lastMessage.id;
                }
                catch {
                    break;
                }
            } while (lastMessage.createdTimestamp > timeStamp);
        }));
        await message.channel.send('Je remonte à la surface !');
        const mostSpeaker = new Map([...users.entries()].sort((a, b) => a[1] - b[1]));
        let membersArr = Array.from(mostSpeaker.entries()).sort((a, b) => b[1] - a[1]);
        console.log('finally =>' + membersArr[0]);
        await message.channel.send(`Et voila ! Le mollusque causeur des 3 derniers mois est <@${membersArr[0][0].id}>`);
    }
    help() {
        return 'Display pong';
    }
}
exports.default = MostSpeaker;
//# sourceMappingURL=most_speaker.js.map