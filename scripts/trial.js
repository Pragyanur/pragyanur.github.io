const MAX_SPEED = 20;
let bees = [];
let count = 0;

class Bee {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(2, 2);
    this.size = 10;
    this.col = 200;
  }
  proximity(bee) {
    return 1 / (dist(bee.pos.x, bee.pos.y, this.pos.x, this.pos.y) + 0.1);
  }
  update() {
    let flowX = random(-0.5, 0.5);
    let flowY = random(-0.5, 0.5);
    this.pos.x = this.pos.x >= width ? 0 : this.pos.x + this.vel.x + flowX;
    this.pos.y = this.pos.y >= height ? 0 : this.pos.y + this.vel.y + flowY;
  }
  behaviour(bees) {
    for (let bee of bees) {
      if (dist(this.pos.x, this.pos.y, bee.pos.x, bee.pos.y) < threshhold) {
        sumX
      }
    }

  }
  show() {
    fill(this.col);
    circle(this.pos.x, this.pos.y, this.size);
  }
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  // cnv.mouseClicked(createBee);

  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < 10; i++) {
      bees[count++] = new Bee(i * 20, j * 20);
    }
  }
}

function draw() {
  background(10);
  for (let bee of bees) {
    bee.update();
    bee.show();
  }
}

// function createBee() {
//   bees[count++] = new Bee(mouseX, mouseY);
// }