"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("./config/config.json");
const bot_1 = require("./bot");
const bot = new bot_1.default(config.token, config.prefix);
bot.run();
//# sourceMappingURL=index.js.map