import * as discord from 'discord.js';
import * as fs from 'fs';

const fileContent = fs.readFileSync('../../dist/commands/users-sorted.json');

let members: Map<any, number> = new Map(JSON.parse(fileContent.toString()));

let membersArr = Array.from(members.entries()).sort((a, b) => b[1] - a[1]);

// let sortedList = [...members.entries()].sort((a, b) => a[1] - b[1]);

console.log(membersArr[0]);
