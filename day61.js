// Advent of Code 2019
// Day 6.1
const fs = require('fs')
const pin = fs.readFileSync('puzzleinput.txt', 'utf-8')

let objects = new Array()
const line = pin.split('\n')
for (let i=0; i<line.length; i++) {
  let orbits = line[i].split(')') // COM ) orbitting
  orbits[0] = orbits[0].trim()
  orbits[1] = orbits[1].trim()
  // check if there's already given COM
  let orbitting = objects.find(element => element.id == orbits[1])
  let com = objects.find(element => element.id == orbits[0])
  if (orbitting != undefined) {
    // modify object
    // find index of found object
    const index = objects.findIndex(searchObj => searchObj.id == orbitting.id)
    let modifyObject = objects[index]
    modifyObject.com = orbits[0]
    objects[index] = modifyObject
  } else {
    // orbitting objects does not exist yet
    // create new object
    let object = {
      id: orbits[1],
      com: orbits[0]
    }
    objects.push(object)
    // make COM object 
    if (com == undefined) {
      object = {
        id: orbits[0],
        com: "none"
      }
      objects.push(object)
    } 
  }
}

let totalOrbits = 0
for (let i=0; i<objects.length; i++) {
  let obj = objects[i]
  getCOM(obj)
}
console.log("total orbits: " + totalOrbits)

function getCOM(obj) {
  if (obj.com != "none") {
    totalOrbits++
    // find next object
    obj = objects.find(element => element.id == obj.com)
    getCOM(obj)
  }
  // if com = none, return without doing anything, because ultimate com is found
}