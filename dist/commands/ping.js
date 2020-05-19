"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ping {
    constructor() {
        this.name = "ping";
        this.description = "";
    }
    async execute(message) {
        await message.guild.channels.cache.get("546411892793540609").send("Pong !");
    }
    help() {
        return "Display pong";
    }
}
exports.default = Ping;
//# sourceMappingURL=ping.js.map