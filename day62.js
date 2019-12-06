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

let routeYou = new Array()
const youIndex = objects.findIndex(searchObj => searchObj.id == "YOU")
let you = objects[youIndex]
findRoute(you, routeYou)
let routeSan = new Array()
const sanIndex = objects.findIndex(searchObj => searchObj.id == "SAN")
let san = objects[sanIndex]
findRoute(san, routeSan)
const distance = commonCom(routeSan, routeYou)
console.log("distance: " + distance)

function getCOM(obj) {
  if (obj.com != "none") {
    totalOrbits++
    // find next object
    obj = objects.find(element => element.id == obj.com)
    getCOM(obj)
  }
  // if com = none, return without doing anything, because ultimate com is found
}

// find and save a route from YOU to ultimate COM
// find and save a route from SAN to ultimate COM
// find the first common com on the route and calculate distance
function findRoute(obj, route) {
  if (obj.com != "none") {
    const routeCom = obj.com
    const nextIndex = objects.findIndex(searchObj => searchObj.id == routeCom)
    const next = objects[nextIndex]
    route.push(next.id)
    findRoute(next, route)
  } 
  // ultimate COM found, return
}

function commonCom(route1, route2) {
  let routeDistance = 0
  for (let i=0; i<route1.length; i++) {
    let secondDistance = 0
    for (let j=0; j<route2.length; j++) {
      if (route1[i] != route2[j]) {
        secondDistance++
      } else {
        return (routeDistance+secondDistance)
      }
    }
    routeDistance++
  }
}