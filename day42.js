// range: 307237-769058
const downLimit = 307237
const upLimit = 769058
/*
It is a six-digit number.
The value is within the range given in your puzzle input.
Two adjacent digits are the same (like 22 in 122345).
Going from left to right, the digits never decrease; they only ever increase
 or stay the same (like 111123 or 135679).
*/
let withinCriteria = 0
for (let i=downLimit; i<=upLimit; i++) {
  if (isThereDouble(i) && noDecrease(i) && sixDigit(i) ) {
    withinCriteria++
  }
}
console.log(withinCriteria)

function sixDigit(ti) {
  let testInt = ti.toString()
  if (testInt.length === 6) {
    return true
  } else {
    return false
  }
}

function isThereDouble(ti) {
  let testInt = ti.toString()
  // take two adjacent chars and compare
  for (let i=0; i<(testInt.length-1); i++) {
    let first = testInt.substring(i, (i+1))
    let second = testInt.substring((i+1), (i+2))
    let third = testInt.substring((i+2), (i+3))
    let previous = testInt.substring((i-1), i)
    if ((first == second) && (previous != first) && (first != third) ) {
      return true
    }
  }
  return false
}

function noDecrease(ti) {
  let testInt = ti.toString()
  // take two adjacent chars and make sure latter is not greater
  for (let i=0; i<(testInt.length-1); i++) {
    let first = testInt.substring(i, (i+1))
    let second = testInt.substring((i+1), (i+2))
    if (first > second) {
      return false
    }
  }
  return true
}
