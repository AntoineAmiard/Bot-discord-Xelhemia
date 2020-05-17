import * as discord from 'discord.js';
import { Command } from '../types/types';
export default class Ping implements Command {
    readonly name: string;
    readonly description: string;
    execute(message: discord.Message): Promise<void>;
    help(): string;
}
