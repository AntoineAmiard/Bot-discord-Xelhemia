export default class Bot {
    private token;
    private client;
    private commands;
    private prefix;
    constructor(token: string, prefix: string);
    run(): void;
    private loadCommands;
}
