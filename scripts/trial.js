const RESOLUTION = 360;

class Figure {
  constructor(x, y, diameter) {
    this.center = createVector(x, y);
    this.radius = diameter / 2;
    this.points = new Array(RESOLUTION + 1);
    for (let i = 0; i <= RESOLUTION; i++) {
      let p = createVector(this.center.x + this.radius * cos(i), this.center.y + this.radius * sin(i));
      this.points[i] = p;
    }
    this.color = [random(255),random(255),random(255)]
  }
  showFigure() {
    noStroke();
    fill(...this.color,100);
    beginShape();
    for (let i = 0; i <= RESOLUTION; i++) {
      vertex(this.points[i].x, this.points[i].y)
    }
    endShape();
  }
  update(offset = 4) {
    let theta = frameCount % RESOLUTION + random(20);
    // let k = random(90);
    for (let i = 0, j = RESOLUTION; i <= RESOLUTION; i++, j -= 1) {
      let oscillation = 0.3*cos(i * 2) * sin(j*offset - i*offset + theta);
      this.points[i].x += cos(i) * oscillation;
      this.points[i].y += sin(i) * oscillation;
    }
  }
}

let d, e, f, g;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  d = new Figure(width / 2, height / 2, 400);
  e = new Figure(width / 2, height / 2, 400);
  f = new Figure(width / 2, height / 2, 400);
  g = new Figure(width / 2, height / 2, 400);
}

function draw() {
  background(255);
  d.showFigure();
  d.update(1);
  e.showFigure();
  e.update(2);
  f.showFigure();
  f.update(3);
  g.showFigure();
  g.update(4);
}