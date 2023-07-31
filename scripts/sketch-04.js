let square = [];
const normalSize = 20;

class GridSquare {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.color = random(10, 200);
  }
  show() {
    fill(0, 100);
    let offset = 3;
    rect(this.x + offset, this.y + offset, this.size);

    noStroke();
    fill(this.color);
    rect(this.x, this.y, this.size);
  }
  update() {
    let distance = dist(mouseX, mouseY, this.x, this.y);
    if (distance < 500) {
      let factor = map(distance, 0, 300, 10, 20);
      this.size = factor;
    }
    else {
      this.size = 20;
    }
  }
}

function setup() {
  w = createCanvas(windowWidth, windowHeight);
  w.position(0, 0);
  w.style('z-index', '-1');
  for (let i = 0; i < width; i += normalSize) {
    for (let j = 0; j < height; j += normalSize) {
      s = new GridSquare(i, j);
      square.push(s);
    }
  }
}

function draw() {
  background(20, 90, 70);
  for (let item of square) {
    item.show();
    item.update();
  }
}