// Advent of Code 2019
// Day 1.2
const fs = require('fs')
const pin = fs.readFileSync('puzzleInput.txt', 'utf-8')
let tin = pin.split('\n')

let result = 0
for (let i=0; i<tin.length;i++) {
  let fuel = Math.floor(parseInt(tin[i]) / 3) - 2
    // total fuel based on the given equation
    // added fuel does have a weight and needs extra fuel itself, therefore a recursive function
  result += recursiveFuel(fuel, fuel)
}

function recursiveFuel(fuel, totalFuel) {
  let partialResult = Math.floor(fuel / 3) - 2
  if (partialResult > 0) {
    totalFuel += partialResult
    return (recursiveFuel(partialResult, totalFuel))
  } else {
    return totalFuel
  }
}

console.log("Result: " + result)