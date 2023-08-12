let walls = [];
let rays = [];
const offset = 0;

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
  createCanvas(windowWidth, windowHeight);
  let textTop = new WALL(50, 100, 510, 100);
  let textRight = new WALL(510, 100, 510, 220);
  let textBottom = new WALL(50, 220, 510, 220);
  let textLeft = new WALL(50, 100, 50, 220);
  walls.push(textTop);
  walls.push(textRight);
  walls.push(textBottom);
  walls.push(textLeft);

  let t = new WALL(offset, offset, width - offset, offset);
  let r = new WALL(width - offset, offset, width - offset, height - offset);
  let b = new WALL(offset, height - offset, width - offset, height - offset);
  let l = new WALL(offset, offset, offset, height - offset);
  walls.push(t);
  walls.push(r);
  walls.push(b);
  walls.push(l);

  let w1 = new WALL(700, 200, 600, 500);
  let w2 = new WALL(600, 500, 100, 500);
  let w3 = new WALL(1000, 100, 1200, 500);
  walls.push(w1);
  walls.push(w2);
  walls.push(w3);

  mouseX = 225;
  mouseY = 300;

  let resolution = PI * 2 / 3000;

  for (let angle = 0; angle < 2 * PI; angle += resolution) {
    let r = new RAY(angle);
    rays.push(r);
    r.updatePosition(225, 300);
  }
  noCursor();
}

function draw() {
  // translate(-width / 2, -height / 2);

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

  fill(255, 100);
  circle(mouseX, mouseY, 5);
  circle(mouseX, mouseY, 15);
  circle(mouseX, mouseY, 30);


  introText();
  patterns();

  if (mouseIsPressed) {
    stroke(255);
    line(wallStart.x, wallStart.y, mouseX, mouseY);
  }
}




let wallStart;
// wall creation
function mousePressed() {
  wallStart = createVector(mouseX, mouseY);
}

function mouseReleased() {
  newWall = new WALL(wallStart.x, wallStart.y, mouseX, mouseY);
  walls.push(newWall);
}

function introText() {
  noStroke();
  fill(250);
  textSize(20);
  text("Ray casting", 70, 140);
  fill(200);
  textSize(15);
  text("> Position of light is the position of your cursor", 70, 170);
  text("> Draw walls by clicking and dragging with left mouse button", 70, 190);
  fill(0);
  text("> This line is visible due to the presence of light inside this box", 70, 210);
  text("Press following keys to generate patterns:\n1: 30 tree forest\n2: 10 random walls", 120, 550);
}

function patterns() {
  if (keyIsPressed) {
    walls = [];
    let t = new WALL(offset, offset, width - offset, offset);
    let r = new WALL(width - offset, offset, width - offset, height - offset);
    let b = new WALL(offset, height - offset, width - offset, height - offset);
    let l = new WALL(offset, offset, offset, height - offset);
    walls.push(t);
    walls.push(r);
    walls.push(b);
    walls.push(l);
    if (keyCode == 49) {
      for (let i = 0; i < 50; i++) {
        let x = random(100, width - 100);
        let y = random(100, height - 100);
        let wall = new WALL(x, y, random(x - 5, x + 5), random(y - 5, y + 5));
        walls.push(wall);
      }
    }
    else if (keyCode == 50) {
      for (let i = 0; i < 10; i++) {
        let x = random(100, width - 100);
        let y = random(100, height - 100);
        let wall = new WALL(x, y, random(x -250, x + 250), random(y - 250, y + 250));
        walls.push(wall);
      }
    }

  }

}