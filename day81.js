// Advent of Code 2019
// Day 8.1
const fs = require('fs')
const pin = fs.readFileSync('puzzleinput.txt', 'utf-8').trim()
const wide = 25
const tall = 6
const numberOfLayers = pin.length / (wide * tall)
// divide digits into layers
let layers = new Array()
for (let i=0; i<numberOfLayers; i++) {
  layers.push(pin.substring(i*(wide*tall), (i+1)*(wide*tall)))
}

// which layer contains fewest number of digits
let leastZeros = 100000
let chosenLayer = 0
for (let i=0; i<numberOfLayers; i++) {
  let numberOfZeros = 0
  for (let j=0; j<(wide*tall); j++) {
    if (layers[i].substring(j, (j+1)) == "0") {
      numberOfZeros++
    }
  }
  if (numberOfZeros < leastZeros) {
    chosenLayer = i
    leastZeros = numberOfZeros
  }
}

// final calculation
let numberOfOnes = 0
let numberOfTwos = 0
for (let i=0; i<layers[chosenLayer].length; i++) {
  if (layers[chosenLayer].substring(i, (i+1)) == "1") {
    numberOfOnes++
  }
  if (layers[chosenLayer].substring(i, (i+1)) == "2") {
    numberOfTwos++
  }
}
console.log(numberOfOnes*numberOfTwos)
