const RESOLUTION = 360;

class Figure {
  constructor(x, y, diameter) {
    this.center = createVector(x, y);
    this.radius = diameter / 2;
    this.phase = random(3,7);
    this.points = new Array(RESOLUTION + 1);
    for (let i = 0; i <= RESOLUTION; i++) {
      let p = createVector(this.center.x + this.radius * cos(i), this.center.y + this.radius * sin(i));
      this.points[i] = p;
    }
    this.color = [random(250,150),random(250,150),random(250,150)]
  }
  showFigure() {
    // stroke(255);
    noStroke();
    fill(...this.color,150);
    beginShape();
    for (let i = 0; i <= RESOLUTION; i++) {
      vertex(this.points[i].x, this.points[i].y)
    }
    endShape();
  }
  update(offset=3) {
    let theta = (frameCount * this.phase) % RESOLUTION + random(20);
    for (let i = 0, j = RESOLUTION; i <= RESOLUTION; i++, j--) {
      let oscillation = cos(j * 2) * sin(j*offset - i*offset + theta) % this.radius;
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
  e = new Figure(width / 2, height / 2, 410);
  f = new Figure(width / 2, height / 2, 420);
  g = new Figure(width / 2, height / 2, 430);
}

function draw() {
  background(255);
  g.showFigure();
  g.update();
  f.showFigure();
  f.update();
  e.showFigure();
  e.update();
  d.showFigure();
  d.update();

}
