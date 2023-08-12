let walls = [];
let rays = [];
const offset = 10;
const resolution = 2 * Math.PI / 200;

class RAY {
  constructor(angle) {
    this.position = createVector(0, 0);
    this.direction = createVector(Math.sin(angle), Math.cos(angle));
    // this.point = createVector(undefined, undefined);
    this.t, this.u;
  }

  intersect(wall) {
    const x1 = wall.A.x;
    const y1 = wall.A.y;
    const x2 = wall.B.x;
    const y2 = wall.B.y;

    const x3 = this.position.x;
    const y3 = this.position.y;
    const x4 = x3 + this.direction.x;
    const y4 = y3 + this.direction.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (den == 0) {
      return false;       // lines never meet
    }

    this.t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    this.u = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / den;

    return (this.t >= 0 && this.t <= 1 && this.u >= 0);
  }

  intersectionPoint(A, B) {
    // x1, y1, x2, y2 are the coordinates of wall
    let x = A.x + this.t * (B.x - A.x);
    let y = A.y + this.t * (B.y - A.y);
    return createVector(x, y);
  }

  showClosestOf(walls) {
    let minPoint = createVector(Infinity, Infinity);
    for (let wall of walls) {
      if (this.intersect(wall)) {
        let p = this.intersectionPoint(wall.A, wall.B);
        if (dist(this.position.x, this.position.y, p.x, p.y) < dist(this.position.x, this.position.y, minPoint.x, minPoint.y)) minPoint = p;
      }
    }
    stroke(200, 70);
    line(this.position.x, this.position.y, minPoint.x, minPoint.y);
  }

  vertices(walls) {
    let minPoint = createVector(Infinity, Infinity);
    for (let wall of walls) {
      if (this.intersect(wall)) {
        let p = this.intersectionPoint(wall.A, wall.B);
        if (dist(this.position.x, this.position.y, p.x, p.y) < dist(this.position.x, this.position.y, minPoint.x, minPoint.y)) minPoint = p;
      }
    }
    return vertex(minPoint.x, minPoint.y);
  }

  updatePosition(x, y) {
    this.position.x = x;
    this.position.y = y;
  }
}




class WALL {
  constructor(x1, y1, x2, y2) {
    this.A = createVector(x1, y1);
    this.B = createVector(x2, y2);
  }
  show() {
    stroke(200);
    line(this.A.x, this.A.y, this.B.x, this.B.y);
  }
}




function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  let wall = new WALL(100, 500, 600, 600);

  let t = new WALL(offset, offset, width - offset, offset);
  let r = new WALL(width - offset, offset, width - offset, height - offset);
  let b = new WALL(offset, height - offset, width - offset, height - offset);
  let l = new WALL(offset, offset, offset, height - offset);

  walls.push(wall);
  walls.push(t);
  walls.push(r);
  walls.push(b);
  walls.push(l);

  for (let angle = 0; angle < 2 * PI; angle += resolution) {
    let r = new RAY(angle);
    rays.push(r);
  }
}

function draw() {
  translate(-width / 2, -height / 2);

  background(0);
  for (let wall of walls) {
    wall.show();
  }

  noStroke();
  fill(255, 150);
  beginShape();
  for (let r of rays) {
    // r.showClosestOf(walls);
    r.vertices(walls);
    r.updatePosition(mouseX, mouseY);
  }
  endShape();
}