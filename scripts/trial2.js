const VAR1 = 4;
const VAR2 = 35;
let cen;
let rings = new Array(20);

class DotRing {
  constructor(quantity, radius) {
    this.quantity = quantity;
    this.radius = radius;
    this.phase = random(360);
    this.dots = [];
    this.offset = random(radius);
    this.alpha = 360 / quantity;
    for (let i = 0; i < this.quantity; i++) {
      let p = createVector(cen.x + this.radius * cos(this.offset + this.alpha * i), cen.y + this.radius * sin(this.offset + this.alpha * i), i);
      this.dots.push(p);
    }
  }
  dotStyle() {
    let fc = 0.8 * frameCount % 360;
    for (let dot of this.dots) {
      stroke(255, 0, 50);
      strokeWeight(1);

      fill(200 + 55 * sin(dot.z * fc), 200 + 55 * sin(this.offset + dot.z * fc), 200 + 55 * cos(dot.z * fc + this.offset / 2));
      circle(dot.x, dot.y, VAR2 * cos(fc + random(5)) + (VAR2 / 1.5) * sin(this.offset + 2 * fc + this.quantity * dot.z));
      fill(200 + 55 * sin(dot.z * fc), 200 + 55 * cos(dot.z * fc), 200 + 55 * sin(this.offset + dot.z * fc));
      circle(dot.x, dot.y, VAR2 * sin(this.offset + 2 * frameCount % 360 + 5 * this.quantity * dot.z));
      fill(200 + 55 * sin(this.offset + dot.z * fc), 200 + 55 * cos(dot.z * fc), 200 + 55 * sin(dot.z * fc));
      circle(dot.x, dot.y, VAR2 * sin(dot.z + random(4) * cos(fc)));
    }
  }
}
const RINGS = 22
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  frameRate(30);
  cen = createVector(width / 2, height / 2);
  for (let i = 1; i < RINGS; i++) {
    let ring = new DotRing(i * VAR1, i * VAR2);
    rings[i - 1] = ring;
  }
}

function draw() {
  background(90, 30, 75);
  for (let i = 0; i < RINGS - 1; i++) {
    rings[i].dotStyle();
  }
}