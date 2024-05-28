// Define the size of the grid
const GRID_SIZE = 50;

// Define the number of herbivores and plants
const NUM_HERBIVORES = 50;
const NUM_PLANTS = 100;

// Define the herbivore and plant classes
class Herbivore {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.energy = 100;
    this.color = color(251, 72, 196);
  }

  move() {
    // Move the herbivore in a random direction
    this.x += random(-1, 1);
    this.y += random(-1, 1);

    // Wrap around the edges of the grid
    this.x = (this.x + GRID_SIZE) % GRID_SIZE;
    this.y = (this.y + GRID_SIZE) % GRID_SIZE;
  }

  eat(plants) {
    // Check for nearby plants and eat them
    for (let i = 0; i < plants.length; i++) {
      if (dist(this.x, this.y, plants[i].x, plants[i].y) < 1) {
        this.energy += 50;
        plants.splice(i, 1);
        break;
      }
    }
  }

  reproduce(herbivores) {
    // If the herbivore has enough energy, reproduce
    if (this.energy >= 200) {
      herbivores.push(new Herbivore(this.x, this.y));
      this.energy -= 125;
    }
  }

  draw() {
    // Draw the herbivore as a square
    fill(this.color);
    rect(this.x * 10, this.y * 10, 10, 10);
  }
}

class Plant {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = color(68, 214, 44);
    this.reproductionTimer = 0;
  }

  reproduce(plants) {
    // Continuously reproduce
    this.reproductionTimer++;
    if (this.reproductionTimer >= 50) {
      plants.push(new Plant(random(GRID_SIZE), random(GRID_SIZE)));
      this.reproductionTimer -= 25;
    }
  }

  draw() {
    // Draw the plant as a small square
    fill(this.color);
    rect(this.x * 10, this.y * 10, 5, 5);
  }
}

// Create arrays to store the herbivores and plants
let herbivores = [];
let plants = [];

function restartLife() {
  herbivores = [];
  plants = [];
  // Create the initial herbivores and plants
  for (let i = 0; i < NUM_HERBIVORES; i++) {
    herbivores.push(new Herbivore(random(GRID_SIZE), random(GRID_SIZE)));
  }

  for (let i = 0; i < NUM_PLANTS; i++) {
    plants.push(new Plant(random(GRID_SIZE), random(GRID_SIZE)));
  }
}

function noMoreLife(){
  herbivores = []
  plants = []
}

function setup() {
  createCanvas(GRID_SIZE * 10, GRID_SIZE * 10);
}

function draw() {
  background(0);

  // Move and draw each herbivore
  for (let i = 0; i < herbivores.length; i++) {
    herbivores[i].move();
    herbivores[i].eat(plants);
    herbivores[i].reproduce(herbivores);
    herbivores[i].draw();

    // Remove herbivores that have run out of energy
    herbivores[i].energy--;
    if (herbivores[i].energy <= 0) {
      herbivores.splice(i, 1);
      i--;
    }
  }

  // Reproduce and draw the plants
  for (let plant of plants) {
    plant.reproduce(plants);
    plant.draw();
    if (!plant) {
      for (let i = 0; i < NUM_PLANTS; i++) {
        plants.push(new Plant(random(GRID_SIZE), random(GRID_SIZE)));
      }
    }
  }
}
