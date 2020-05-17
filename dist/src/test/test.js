"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = require("../../dist/commands/users.json");
let members = new Map(JSON.parse(users.toString()));
let sortedList = [...members.entries()].sort((a, b) => a[1] - b[1]);
console.log(sortedList[sortedList.length - 1]);
//# sourceMappingURL=test.js.map