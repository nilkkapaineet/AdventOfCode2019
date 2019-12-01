// Advent of Code 2019
// Day 1.1
const fs = require('fs')
const pin = fs.readFileSync('puzzleInput.txt', 'utf-8')
let tin = pin.split('\n')

let result = 0
for (let i=0; i<tin.length;i++) {
  // total fuel based on the given equation
  result += Math.floor(parseInt(tin[i]) / 3) - 2
}

console.log("Result: " + result)