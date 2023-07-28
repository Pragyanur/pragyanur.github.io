let square = [];
const normalSize = 20;

class GridSquare {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.color = random(200);
  }
  show() {
    fill(0, 100);
    let offset = 3;
    rect(this.x + offset, this.y + offset, this.size);

    noStroke();
    fill(this.color);
    rect(this.x, this.y, this.size);
  }
  distance() {
    let dis = Math.sqrt((mouseX - this.x) * (mouseX - this.x) + (this.y - mouseY) * (this.y - mouseY));
    return dis;
  }
  update() {
    if (this.distance() < 500) {
      let factor = map(this.distance(), 0, 300, 10, 20);
      this.size = factor;
      // let col = map(this.distance(), 0, 200, 10, 0);
      // this.color = col;
    }
    else {
      this.size = 20;
      // this.color = 0;
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
  background(150, 0, 0);
  for (let item of square) {
    item.show();
    item.update();
  }
}