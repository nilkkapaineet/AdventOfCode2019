// Advent of Code 2019
// Day 2.1
const fs = require('fs')
const pin = fs.readFileSync('puzzleinput.txt', 'utf-8')

let originalNumbers = pin.split(',')
for (let i=0; i<originalNumbers.length; i++) {
  originalNumbers[i] = parseInt(originalNumbers[i], 10)
}
let numbers = originalNumbers

for (let noun=0; noun<=99; noun++) {
  for (let verb=0; verb<=99; verb++) {
    // restore original array
    numbers = originalNumbers.slice()
    let result = getAddress0(noun, verb)
    if (result[0] === 19690720) {
      console.log(result[0] + ", " + result[1] + ", " + result[2])
      console.log(100*noun + verb)
      process.exit()
    }
  }
}

function getAddress0(noun, verb) {
  // iterate through numbers and count new values
  numbers[1] = noun
  numbers[2] = verb
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
  return [numbers[0], numbers[1], numbers[2] ]
}
