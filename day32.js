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
let lengthOfRoute = 0

// parse commands
for (let i=0; i<instructions1.length; i++) {
  let command = instructions1[i]
  let direction = command.substring(0, 1)
  let distance = parseInt(command.substring(1, command.length))
  travel1(direction, distance, lengthOfRoute)
}

// reinit for second wire
x = 0
y = 0
let intersections = []
lengthOfRoute = 0

// parse second string of commands
for (let i=0; i<instructions2.length; i++) {
  let command = instructions2[i]
  let direction = command.substring(0, 1)
  let distance = parseInt(command.substring(1, command.length))
  travel2(direction, distance, lengthOfRoute)
}

// iterate intersections, which one is closest to starting point both wires considering?
let minimum = 100000
for (let i=0; i<intersections.length; i++) {
  let xy = intersections[i]
  let sumOfRoute = xy[2] + xy[3]
   if (sumOfRoute < minimum && sumOfRoute !== 0) {
    minimum = sumOfRoute
  }
}
console.log(minimum)

// mark route for wire
function travel1(dir, dist, lor) {
  let xDiff = 0
  let yDiff = 0
  if (dir == "U") {
    for (let i=0; i<dist; i++) {
      lor++
      wire1.push([x, (y+i), lor-1])
    }
    yDiff = dist
  } else if (dir == "D") {
    for (let i=0; i<dist; i++) {
      lor++
      wire1.push([x, (y-i), lor-1])
    }
    yDiff = -dist
  } else if (dir == "R") {
    for (let i=0; i<dist; i++) {
      lor++
      wire1.push([(x+i), y, lor-1])
    }
    xDiff = dist
  } else {
    // left
    for (let i=0; i<dist; i++) {
      lor++
      wire1.push([(x-i), y, lor-1])
    }
    xDiff = -dist
  }
  x += xDiff
  y += yDiff
  lengthOfRoute += dist
}

// route of wire2
function travel2(dir, dist, lor) {
  let xDiff = 0
  let yDiff = 0
  if (dir == "U") {
    for (let i=0; i<dist; i++) {
      lor++
      // iterate trough wire1
      for (let j=0; j<wire1.length; j++) {
        let w1 = wire1[j]
        if (w1[0] == x && w1[1] == (y+i)) {
          // push intersection coordinates and length of the route for wire2
          intersections.push([x, (y+i), lor-1, w1[2]])
        }
      }
    }
    yDiff = dist
  } else if (dir == "D") {
    for (let i=0; i<dist; i++) {
      lor++
      for (let j=0; j<wire1.length; j++) {
        let w1 = wire1[j]
        if (w1[0] == x && w1[1] == (y-i)) {
          intersections.push([x, (y-i), lor-1, w1[2]])
        }
      }
    }
    yDiff = -dist
  } else if (dir == "R") {
    for (let i=0; i<dist; i++) {
      lor++
      for (let j=0; j<wire1.length; j++) {
        let w1 = wire1[j]
        if (w1[0] == (x+i) && w1[1] == y) {
          intersections.push([(x+i), y, lor-1, w1[2]])
        }
      }
    }    
    xDiff = dist
  } else {
    // left
    for (let i=0; i<dist; i++) {
      lor++
      for (let j=0; j<wire1.length; j++) {
        let w1 = wire1[j]
        if (w1[0] == (x-i) && w1[1] == y) {
          intersections.push([(x-i), y, lor-1, w1[2]])
        }
      }
    }    
    xDiff = -dist
  }
  x += xDiff
  y += yDiff
  lengthOfRoute += dist
}
