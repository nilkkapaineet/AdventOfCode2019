// Advent of Code 2019
// Day 8.2
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

let finalImage = new Array(wide*tall)
let lockImage = new Array(wide*tall)
for (let i=0; i<(wide*tall); i++) {
  lockImage[i] = false
}
for (let i=0; i<numberOfLayers; i++) {
  for (let j=0; j<(wide*tall); j++) {
    if (layers[i].substring(j, (j+1)) == "0" && !lockImage[j]) {
      finalImage[j] = " "
      lockImage[j] = true
    }
    if (layers[i].substring(j, (j+1)) == "1" && !lockImage[j]) {
      finalImage[j] = "#"
      lockImage[j] = true
    }
  }
}
let output = "";
for (let i=0; i<finalImage.length; i++) {
  output += finalImage[i];
  if ((i+1)%wide == 0) {
    output += '\n'
  }
}
console.log(output)
