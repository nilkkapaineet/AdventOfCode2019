// Advent of Code 2019
// Day 24.1
const fs = require('fs')
const pin = fs.readFileSync('puzzleinput.txt', 'utf-8')
const rows = pin.split('\n')
let grid = [
  [".", ".", ".", ".", "."],
  [".", ".", ".", ".", "."],
  [".", ".", ".", ".", "."],
  [".", ".", ".", ".", "."],
  [".", ".", ".", ".", "."]
]

grid = initGrid(grid)
let listOfLayers = []
listOfLayers.push(grid)
asyncMain(grid, listOfLayers) // checking for similar layers takes time, so promise

async function asyncMain (grid, listOfLayers) {
  // iterate to look for similar layer
  notSimilar = true
  let round = 0
  while (true) {
    round++
    let cloneLayer = copyGrid(grid)
    for (let i=0; i<grid.length; i++) {
      for (let j=0; j<grid.length; j++) {
        if (grid[i][j] == "#") {
          cloneLayer[i][j] = evolutionBug(i, j, grid)
        } else {
          cloneLayer[i][j] = evolutionEmpty(i, j, grid)
        }
      }
    }
    // check if there are same kind of layer already
    if (await sameLayer(listOfLayers, cloneLayer)) {
      console.log("Similar layer found at round " + round)
      printGrid(cloneLayer)
      console.log(biodiversityRating(cloneLayer))
      break
    } else {
      listOfLayers.push(cloneLayer)
      grid = [...cloneLayer]
    }
  }
}

function biodiversityRating (grid) {
  let points = 0
  let power = 1
  for (let i=0; i<grid.length; i++) {
    for (let j=0; j<grid.length; j++) {
      if (grid[i][j] == "#") {
        points += power
      }
      power = power * 2
    }
  }
  return points
}

function copyGrid (grid) {
  let copy = [
    [".", ".", ".", ".", "."],
    [".", ".", ".", ".", "."],
    [".", ".", ".", ".", "."],
    [".", ".", ".", ".", "."],
    [".", ".", ".", ".", "."]
  ]  
  for (let i=0; i<grid.length; i++) {
    for (let j=0; j<grid.length; j++) {
      if (grid[i][j] == "#") {
        copy[i][j] = "#"
      }
    }
  }
  return copy
}

function printGrid (grid) {
  for (let i=0; i<grid.length; i++) {
    for (let j=0; j<grid.length; j++) {
      process.stdout.write(grid[i][j])
    }
    console.log("")
  }
  console.log("")
}

function initGrid (grid) {
  for (let i=0; i<rows.length; i++) {
    for (let j=0; j<rows.length; j++) {
      if (rows[i][j] == "#") {
        grid[i][j] = "#"
      }
    }
  }
  return grid  
}

function evolutionEmpty (i, j, grid) {
  let bugs = 0
  if (i>0) {
    if (grid[i-1][j] == "#") {
      bugs++
    }
  }
  if (i<4) {
    if (grid[i+1][j] == "#") {
      bugs++
    }
  }
  if (j>0) {
    if (grid[i][j-1] == "#") {
      bugs++
    }
  }
  if (j<4) {
    if (grid[i][j+1] == "#") {
      bugs++
    }
  }
  if (bugs == 1 || bugs == 2) {
    return("#")
  } else {
    return(".")
  }
}

function evolutionBug (i, j, grid) {
  let bugs = 0
  if (i>0) {
    if (grid[i-1][j] == "#") {
      bugs++
    }
  }
  if (i<4) {
    if (grid[i+1][j] == "#") {
      bugs++
    }
  }
  if (j>0) {
    if (grid[i][j-1] == "#") {
      bugs++
    }
  }
  if (j<4) {
    if (grid[i][j+1] == "#") {
      bugs++
    }
  }
  if (bugs == 1) {
    return("#")
  } else {
    return(".")
  }
}

function sameLayer (listOfLayers, currentGrid) {
  return new Promise (resolve => {
    listOfLayers.forEach(layer => {
      // go through every layer
      let numberOfSimilarCells = 0
      for (let i=0; i<layer.length; i++) {
        for (let j=0; j<layer.length; j++) {
          if (layer[i][j] == currentGrid[i][j]) {
            numberOfSimilarCells++
          }
        }
      }
      if (numberOfSimilarCells == 25) {
        resolve(true)
      }
    });
    resolve(false)
  })
}