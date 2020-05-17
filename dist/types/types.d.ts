import * as discord from 'discord.js';
export interface Command {
    readonly name: string;
    readonly description: string;
    execute(message: discord.Message, args: string[]): void;
    help(): string;
}
