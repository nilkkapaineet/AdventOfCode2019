// Advent of Code 2019
// Day 2.1
const fs = require('fs')
const pin = fs.readFileSync('puzzleInput.txt', 'utf-8')

let numbers = pin.split(',')
for (let i=0; i<numbers.length; i++) {
  numbers[i] = parseInt(numbers[i], 10)
}

// mandatory initial replacements
numbers[1] = 12
numbers[2] = 2

// iterate through numbers and count new values
for (let i=0; i<numbers.length; i=i+4) {
  let operation = numbers[i]
  if (operation === 99) {
    // terminate program code
    break
  }
  
  let pos1 = numbers[i+1]
  let pos2 = numbers[i+2]
  let target = numbers[i+3]
  
  if (operation === 1) {
    // add
    let result = numbers[pos1] + numbers[pos2]
    numbers[target] = result
  } else if (operation === 2) {
    // multiply
    let result = numbers[pos1] * numbers[pos2]
    numbers[target] = result
  }
}

console.log(numbers[0])
