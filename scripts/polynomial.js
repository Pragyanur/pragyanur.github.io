const RESOLUTION = 100

let origin;
let s;

class Polynomial {
  constructor(x = 20) {
    this.s = width / x;
    this.origin = createVector(width / 2, height / 2);
    this.scale = x;
  }
  pofx(a = 2, b = 3, c = 1.5, x) {
    let y = a * x * x + b * x + c;
    return y;
  }
  plot() {
    let points = [];
    noFill();
    stroke(255, 255, 0);
    beginShape();
    for (let i = 0; i < width; i += 1) {
      let x = map(i, 0, width, -this.origin.x , this.origin.x);
      let k = this.pofx(0, 1, 0, x);
      let y = map(k, -this.origin.y , this.origin.y , height, 0);
      x = map(x, -this.origin.x, this.origin.x, 0, width);
      vertex(x, y);
    }
    endShape();
  }
  grid() {
    stroke(255, 50);
    for (let i = this.origin.x; i < width; i += this.s) {
      line(i, 0, i, height);
      line(width - i, 0, width - i, height);
    }
    for (let i = this.origin.y; i < height; i += this.s) {
      line(0, i, width, i);
      line(0, height - i, width, height - i);
    }
    stroke(255);
    line(0, this.origin.y, width, this.origin.y);
    line(this.origin.x, 0, this.origin.x, height);
  }

}


function setup() {
  createCanvas(windowHeight, windowHeight);
  px = new Polynomial();
}

function draw() {
  background(0);
  px.grid();
  px.plot();
}