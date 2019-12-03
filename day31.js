// Advent of Code 2019
// Day 2.1
const fs = require('fs')
const pin = fs.readFileSync('puzzleinput.txt', 'utf-8')

let twoWires = pin.split('\n')
let instructions1 = twoWires[0].split(',')
let instructions2 = twoWires[1].split(',')
// for example U34 or D123

// starting point:
let wire1 = []
let wire2 = []
let x = 0
let y = 0

// parse commands
for (let i=0; i<instructions1.length; i++) {
  let command = instructions1[i]
  let direction = command.substring(0, 1)
  let distance = parseInt(command.substring(1, command.length))
  travel1(direction, distance, command)
}

// reinit for second wire
x = 0
y = 0
let intersections = []

// parse second string of commands
for (let i=0; i<instructions2.length; i++) {
  let command = instructions2[i]
  let direction = command.substring(0, 1)
  let distance = parseInt(command.substring(1, command.length))
  travel2(direction, distance)
}

// iterate intersections, which one is closest to starting point?
let minimum = 100000
for (let i=0; i<intersections.length; i++) {
  let xy = intersections[i]
  let manhDist = Math.abs(0-xy[0]) + Math.abs(0-xy[1]);
  if (manhDist < minimum && manhDist !== 0) {
    minimum = manhDist
  }
}
console.log(minimum)

// mark route for wire
function travel1(dir, dist, command) {
  let xDiff = 0
  let yDiff = 0
  if (dir == "U") {
    for (let i=0; i<dist; i++) {
      wire1.push([x, (y+i)])
    }
    yDiff = dist
  } else if (dir == "D") {
    for (let i=0; i<dist; i++) {
      wire1.push([x, (y-i)])
    }
    yDiff = -dist
  } else if (dir == "R") {
    for (let i=0; i<dist; i++) {
      wire1.push([(x+i), y])
    }
    xDiff = dist
  } else {
    // left
    for (let i=0; i<dist; i++) {
      wire1.push([(x-i), y])
    }
    xDiff = -dist
  }
  x += xDiff
  y += yDiff
}

// route of wire2
function travel2(dir, dist) {
  let xDiff = 0
  let yDiff = 0
  if (dir == "U") {
    for (let i=0; i<dist; i++) {
      // iterate trough wire1
      for (let j=0; j<wire1.length; j++) {
        let w1 = wire1[j]
        if (w1[0] == x && w1[1] == (y+i)) {
          // push intersection coordinates
          intersections.push([x, (y+i)])
        }
      }
    }
    yDiff = dist
  } else if (dir == "D") {
    for (let i=0; i<dist; i++) {
      for (let j=0; j<wire1.length; j++) {
        let w1 = wire1[j]
        if (w1[0] == x && w1[1] == (y-i)) {
          intersections.push([x, (y-i)])
        }
      }
    }
    yDiff = -dist
  } else if (dir == "R") {
    for (let i=0; i<dist; i++) {
      for (let j=0; j<wire1.length; j++) {
        let w1 = wire1[j]
        if (w1[0] == (x+i) && w1[1] == y) {
          intersections.push([(x+i), y])
        }
      }
    }    
    xDiff = dist
  } else {
    // left
    for (let i=0; i<dist; i++) {
      for (let j=0; j<wire1.length; j++) {
        let w1 = wire1[j]
        if (w1[0] == (x-i) && w1[1] == y) {
          intersections.push([(x-i), y])
        }
      }
    }    
    xDiff = -dist
  }
  x += xDiff
  y += yDiff
}
