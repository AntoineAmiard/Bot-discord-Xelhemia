import * as config from './config/config.json';

import Bot from './bot';

const bot: Bot = new Bot(config.token, config.prefix);

bot.run();
