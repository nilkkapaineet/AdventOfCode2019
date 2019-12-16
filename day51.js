// Advent of Code 2019
// Day 5.2
const fs = require('fs')
const pin = fs.readFileSync('puzzleinput.txt', 'utf-8')
const numbers = pin.split(',')
for (let i=0; i<numbers.length; i++) {
  numbers[i] = parseInt(numbers[i], 10)
}

const inputValue = 1

let retval = 0
// iterate through numbers and count new values
let incr = 0
for (let i=0; i<numbers.length; i=i+incr) {
  let opcode = numbers[i]
  let param1 = numbers[i+1]
  let param2 = numbers[i+2]
  let target = numbers[i+3]
  let mode1 = 0
  let mode2 = 0
  let mode3 = 0
  let parameters = new Array()
  if (opcode > 99) {
    const retval = parseLongOpcode(numbers[i])
    opcode = retval[0]
    mode1 = retval[1]
    mode2 = retval[2]
    mode3 = retval[3]
  }
  if (opcode == 1) {
    numbers[target] = addition(param1, param2, mode1, mode2, numbers)
    incr = 4
  } else if (opcode == 2) { 
    numbers[target] = multiply(param1, param2, mode1, mode2, numbers)
    incr = 4
  } else if (opcode == 3) {
    numbers[param1] = inputValue
    if (mode1 != 0) {
    }
    incr = 2
  } else if (opcode == 4) {
    retval = output(param1, mode1, numbers, i)
    incr = 2
  } else if (opcode == 99) {
    process.exit()
  } else {
    console.log("error: " + opcode)
    process.exit()
  }
}

function getParams(param, mode, numbers) {
  if (mode == 0) {
    if (param == 0) {
      return inputValue
    } else {
      return(numbers[param])
    }
  } else {
    return(param)
  }
}

function addition(param1, param2, mode1, mode2, numbers) {
  param1 = getParams(param1, mode1, numbers)
  param2 = getParams(param2, mode2, numbers)
  return (param1+param2)
}

function multiply(param1, param2, mode1, mode2, numbers) {
  param1 = getParams(param1, mode1, numbers)
  param2 = getParams(param2, mode2, numbers)
  return (param1*param2)
} 

function output(param, mode, numbers, i) {
  param = getParams(param, mode, numbers)
  console.log(param)
  return param
}

function parseLongOpcode(input) {
  let retval = new Array()
  const stringOpcode = input.toString()
  opcode = parseInt(stringOpcode.substring(stringOpcode.length-2, stringOpcode.length))
  retval[0] = opcode
  mode1 = parseInt(stringOpcode.substring(stringOpcode.length-3, stringOpcode.length-2))
  if (isNaN(mode1)) {
    mode1 = 0
  }
  retval[1] = mode1
  mode2 = parseInt(stringOpcode.substring(stringOpcode.length-4, stringOpcode.length-3))
  if (isNaN(mode2)) {
    mode2 = 0
  }
  retval[2] = mode2
  mode3 = parseInt(stringOpcode.substring(stringOpcode.length-5, stringOpcode.length-4))
  if (isNaN(mode3)) {
    mode3 = 0
  } 
  retval[3] = mode3
  return(retval)
}
