// Advent of Code 2019
// Dax 22.1
const fs = require('fs')
const pin = fs.readFileSync('puzzleInput.txt', 'utf-8')
const rows = pin.split('\n')
let stack = []
for (let i=0; i<10007; i++) {
  stack[i] = i
}

rows.forEach(command => {
  // parse command
  const commands = command.split(" ")
 // console.log(commands[0])
  if (commands[0] == "cut") {
    stack = cut(stack, commands[1])    
  } else if (commands[1] == "into") {
    stack = newStack(stack)
  } else if (commands[1] == "with") {
    stack = incr(stack, commands[3])
  }
});
console.log("Position of card 2019: " + stack.indexOf(2019))

function printStack (stack) {
  stack.forEach(number => {
    process.stdout.write(number + " ")
  });
  console.log("")
}

function newStack (stack) {
  // reverse order
  return(stack.reverse())
}

function incr (stack, index) {
  let tempArr = []
  let currentPosition = 0
  let increment = 0
  for (let i=0; i<stack.length; i++) {
    tempArr[currentPosition] = stack[i]
    increment = (currentPosition + parseInt(index))
    currentPosition = increment%(stack.length)
  }
  return tempArr
}

function cut (stack, index) {
  if (index < 0) {
    stack = negativeCut(stack, index)
  } else {
    let tempArr = []
    for (let i=0; i<index; i++) {
      tempArr[i] = stack.shift()    
    }
    stack = stack.concat(tempArr)
  }  
  return stack
}

function negativeCut (stack, index) {
  index = Math.abs(index)
  let tempArr = stack.slice(stack.length-index)
  stack = stack.slice(0, (stack.length-index))
  tempArr = tempArr.concat(stack)
  return tempArr
}