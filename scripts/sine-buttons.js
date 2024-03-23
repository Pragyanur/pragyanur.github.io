const SIZE = 40;
let grid = [];
let perRow;

class Dots {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.shadow = createVector(x, y + 3);
    this.color = [random(1, 99), 60, 75];
    this.offset = random(10);
  }
  animate() {
    this.position.y -= this.color[0] * 0.025 * sin(this.color[0] * 0.25 * frameCount);
  }
  shade() {
    fill(10);
    stroke(10);
    rect(this.position.x - SIZE / 2, this.position.y, SIZE, dist(this.position.x, this.position.y, this.shadow.x, this.shadow.y));
    circle(this.shadow.x, this.shadow.y, SIZE);
  }
  show() {
    fill(...this.color);
    circle(this.position.x, this.position.y, SIZE);
    fill(this.color[0], 80, 50);
    text(String(this.color[0]).slice(0,4), this.position.x - SIZE / 4, this.position.y + SIZE / 10);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 100);
  angleMode(DEGREES);
  frameRate(60);
  perRow = width / (1.5 * SIZE);
  for (let i = 0; i * 1.3 * SIZE < height; i++) {
    for (let j = 0; j < perRow + 2; j += 1) {
      let offset = 0;
      if (i % 2 == 0) {
        offset = 0.5;
      }
      let d = new Dots((j + offset)  * 1.5 * SIZE, i * 1.3 * SIZE);
      grid.push(d);
    }
  }
}

function draw() {
  background(10, 15 ,95);
  for (let dot of grid) {
    dot.shade();
    dot.animate();
    dot.show();
  }
}