class RAY {
  constructor(angle) {
    this.position = createVector(undefined, undefined);
    this.direction = createVector(Math.sin(angle), Math.cos(angle));
    this.point = createVector(undefined, undefined);
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

    let t, u;

    t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    u = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / den;

    if (t >= 0 && t <= 1 && u >= 0) {
      this.point.x = x1 + t * (x2 - x1);
      this.point.y = y1 + t * (y2 - y1);
    }
    return (t >= 0 && t <= 1 && u >= 0);
  }

  show(wall) {
    if (this.intersect(wall)) {
      stroke(200, 70);
      line(this.position.x, this.position.y, this.point.x, this.point.y);
    }
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



let walls = [];
let rays = [];
const offset = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
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

  for (let angle = 0; angle < 2 * PI; angle += 0.063) {
    let r = new RAY(angle);
    rays.push(r);
  }
}

function draw() {
  background(0);
  for (let wall of walls) {
    wall.show();
  }

  for (let r of rays) {
    r.updatePosition(mouseX, mouseY);
    for (let wall of walls) {
      r.show(wall);
    }
  }
}