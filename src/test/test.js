"use strict";
exports.__esModule = true;
var fs = require("fs");
var fileContent = fs.readFileSync('../../dist/commands/users-sorted.json');
var members = new Map(JSON.parse(fileContent.toString()));
var membersArr = Array.from(members.entries()).sort(function (a, b) { return b[1] - a[1]; });
// let sortedList = [...members.entries()].sort((a, b) => a[1] - b[1]);
console.log(membersArr[0]);
