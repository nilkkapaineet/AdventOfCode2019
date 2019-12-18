// Advent of Code
// Day 12.1

class Moon {
  constructor(moonPos, id) {
    this._id = id
    this._x = moonPos[0]
    this._y = moonPos[1]
    this._z = moonPos[2]
    this._vx = 0
    this._vy = 0
    this._vz = 0
  }

  potentialEnergy() {
    return(Math.abs(this._x)+Math.abs(this._y)+Math.abs(this._z))
  }

  kineticEnergy() {
    return(Math.abs(this._vx)+Math.abs(this._vy)+Math.abs(this._vz))
  }

  applyVelocity() {
    this._x += this._vx
    this._y += this._vy
    this._z += this._vz
  }

  gravity(otherMoons) {
    // applies changes only to this moon
    otherMoons.forEach(moon => { 
      if (moon.id != this._id) {
        // compare positions
        if (this._x < moon.x) {
          this._vx++;
        } else if (this._x > moon.x) {
          this._vx--
        }
        if (this._y < moon.y) {
          this._vy++;
        } else if (this._y > moon.y) {
          this._vy--
        }
        if (this._z < moon.z) {
          this._vz++;
        } else if (this._z > moon.z) {
          this._vz--
        }
      }      
    }); 
  }

  printPosVel() {
    console.log(this._id + " pos= <x=" + this._x + ", y=" + this._y + ", z=" + this._z + ", vel= <x=" + this._vx + ", y=" + this._vy + ", z=" + this._vz + ">")
  }

  set id (newId) {
    this._id = newId
  }
  get id () {
    return this._id
  }
  set x (newX) {
    this._x = newX
  }
  get x () {
    return this._x
  }
  set y (newY) {
    this._y = newY
  }
  get y () {
    return this._y
  }
  set z (newZ) {
    this._z = newZ
  }
  get z () {
    return this._z
  }

  set vx (newVX) {
    this._vx = newVX
  }
  get vx () {
    return this._vx
  }
  set vy (newVY) {
    this._vy = newVY
  }
  get vy () {
    return this._vy
  }
  set vz (newVZ) {
    this._vz = newVZ
  }
  get vz () {
    return this._vz
  }

}


/*<x=13, y=9, z=5>
<x=8, y=14, z=-2>
<x=-5, y=4, z=11>
<x=2, y=-6, z=1>*/
let moonPos = [
  [13, 9, 5],
  [8, 14, -2],
  [-5, 4, 11],
  [2, -6, 1]
  ]
let moonVel = []

// init moons
let moons = []
for (let i=0; i<4; i++) {
  moons[i] = new Moon(moonPos[i], i)
}

// main program
for (let i=0; i<1000; i++) {
  for (let j=0; j<moons.length; j++) {
    moons[j].gravity(moons)
  }
  for (let j=0; j<moons.length; j++) {
    moons[j].applyVelocity()
  }
}

let totalEnergy = 0
for (let j=0; j<moons.length; j++) {
//  moons[j].printPosVel()
  const pot = moons[j].potentialEnergy()
  const kin = moons[j].kineticEnergy()
  totalEnergy += (pot*kin)
}
console.log("Total energy: " + totalEnergy)
