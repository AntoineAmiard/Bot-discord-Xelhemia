"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const fileContent = fs.readFileSync('../../dist/commands/users-sorted.json');
let members = new Map(JSON.parse(fileContent.toString()));
let membersArr = Array.from(members.entries()).sort((a, b) => b[1] - a[1]);
console.log(membersArr[0]);
//# sourceMappingURL=test.js.map