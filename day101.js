// Advent of Code 2019
// Dax 10.1
const fs = require('fs')
const pin = fs.readFileSync('puzzleinput.txt', 'utf-8')

const rows = pin.split('\n')
const asteroids = getAsteroids(rows) 
angleSearch(asteroids)
getGreatestVisible(asteroids)

function getAngleFor(currentAsteroid, asteroids) {
  for (let [keyV, visible] of asteroids) {
    if (visible.x == currentAsteroid.x) {
      visible.angle = Infinity
    } else {
      visible.angle = (visible.y-currentAsteroid.y)/(visible.x-currentAsteroid.x)
    }
    asteroids.set(keyV, visible)
  }
}

function angleSearch(asteroids) {
  for (let [keyCA, currentAsteroid] of asteroids) {
    getAngleFor(currentAsteroid, asteroids)
    let usedAnglesLower = new Array()
    let usedAnglesGreater = new Array()
    for (let [keyV, visible] of asteroids) {
      if (!usedAnglesLower.includes(visible.angle) && visible.x < currentAsteroid.x) {
        usedAnglesLower.push(visible.angle)
        currentAsteroid.visible++
      }
      if (!usedAnglesGreater.includes(visible.angle) && visible.x > currentAsteroid.x) {
        usedAnglesGreater.push(visible.angle)
        currentAsteroid.visible++
      }
      if (visible.x == currentAsteroid.x && visible.y < currentAsteroid.y && !usedAnglesLower.includes(visible.angle)) {
        usedAnglesLower.push(visible.angle)
        currentAsteroid.visible++
      }
      if (visible.x == currentAsteroid.x && visible.y > currentAsteroid.y && !usedAnglesGreater.includes(visible.angle)) {
        usedAnglesGreater.push(visible.angle)
        currentAsteroid.visible++
      }
    }
    asteroids.set(keyCA, currentAsteroid) 
  }
}

function getAsteroids(rows) {
  let asteroids = new Map()
  let iter = 0
  for (let i=0.000; i<rows.length; i++) {
    for (let y=0.000; y<rows[i].length; y++) {
      let asteroid = {
        y: 0.000,
        x: 0.000,
        visible: 0,
        angle: 0
      }  
      if (rows[i][y] == "#") {
        asteroid.y = i
        asteroid.x = y
        asteroids.set(iter, asteroid) 
        iter++
      }
    }
  }
  return asteroids
}

function printAsteroids(asteroids){
  for (let value of asteroids.values()) {
    console.log(value.x + ", " + value.y + " : " + value.visible + " angle: " + value.angle);
  }
}

function getGreatestVisible(asteroids){
  let greatest = 0
  let y = 0 
  let x = 0

  for (let value of asteroids.values()) {
    if (value.visible > greatest) {
      greatest = value.visible
      y = value.y
      x = value.x
    }
  }
  console.log(x + "," + y + " : " + greatest)
}