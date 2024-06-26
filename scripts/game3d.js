const BALL_SIZE = 16;
const SPEED = 5;
let Player1;
let B1;
let ball;
let pfSize = 500;
let keys = {};

class Ball {
  constructor(x = width / 2, y = height / 2) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-2, 2), 0.1);
    this.fac = SPEED;
  }
  update() {
    this.vel.normalize();
    this.pos.x += this.vel.x * this.fac;
    this.pos.y += this.vel.y * this.fac;
    if (this.pos.x < -width / 2 || this.pos.x > width / 2) this.vel.x = -this.vel.x;
    if (this.pos.y < -height / 2 || this.pos.y > height / 2) this.vel.y = -this.vel.y;
    if (this.fac != 5) this.fac += this.fac > SPEED ? -1 : 1;
    // debug
    if (this.pos.x < -width / 2) this.pos.x++;
    if (this.pos.x > width / 2) this.pos.x--;
    if (this.pos.y < -height / 2) this.pos.y++;
    if (this.pos.y > height / 2) this.pos.y--;
  }
  reflect(player) {
    if (dist(player.line, player.pos, this.pos.x, this.pos.y) <= player.size) {
      this.vel = player.hit(this);
    }
  }
  show() {
    push();
    translate(this.pos.x, this.pos.y);
    ambientLight(180);
    specularMaterial(250);
    noStroke();
    fill(200);
    sphere(BALL_SIZE);
    pop();
    push();
    strokeWeight(5);
    stroke(200, 30, 30);
    line(this.pos.x, this.pos.y, this.pos.x + this.vel.x * 40, this.pos.y + this.vel.y * 40);
    pop();
  }
}

class Player {
  constructor() {
    this.rot = 0;
    this.rot2 = 0;
    this.pos = 0;
    this.pos2 = 0;
    this.size = height / 10;
    this.line = width / 2 - this.size;
    this.line2 = -width / 2 + this.size;
    this.rAcc_1 = 0;
    this.rAcc_2 = 0;
  }

  show() {
    push();
    ambientLight(80);
    specularMaterial(250);
    noStroke();
    shininess(50);
    translate(this.line, this.pos, 0);
    rotateZ(this.rot);
    fill(255);
    box(this.size / 20, this.size, this.size);
    pop();
  }

  handleKeys() {
    const rotationSpeed = 0.01;
    const positionSpeed = 5;
    if (keys[UP_ARROW]) this.pos -= positionSpeed;
    if (keys[DOWN_ARROW]) this.pos += positionSpeed;
    if (keys[LEFT_ARROW]) this.rAcc_1 -= rotationSpeed;
    if (keys[RIGHT_ARROW]) this.rAcc_1 += rotationSpeed;
  }

  update() {
    this.pos = constrain(this.pos, -height / 2 + this.size / 2, height / 2 - this.size / 2);
    this.rAcc_1 = constrain(this.rAcc_1, -1, 1);
    this.rot += this.rAcc_1;
    this.rot = this.rot % PI;
    if (this.rAcc_1 != 0) this.rAcc_1 *= 0.9;
  }

  hit(ball) {
    const bx = ball.pos.x;
    const by = ball.pos.y;

    let A = createVector(this.line - (this.size / 2) * sin(-this.rot), this.pos - (this.size / 2) * cos(-this.rot));
    let B = createVector(this.line + (this.size / 2) * sin(-this.rot), this.pos + (this.size / 2) * cos(-this.rot));
    let normal = createVector(this.line - (this.size / 2) * cos(this.rot), this.pos - (this.size / 2) * sin(this.rot));
    let normal2 = createVector(this.line + (this.size / 2) * cos(this.rot), this.pos + (this.size / 2) * sin(this.rot));
    let initialVelocity = createVector(ball.vel.x, ball.vel.y);
    let shortestDist = abs((A.y - B.y) * bx - (A.x - B.x) * by + (A.x * B.y - A.y * B.x)) / sqrt((A.y - B.y) ** 2 + (A.x - B.x) ** 2);

    line(this.line, this.pos, normal.x, normal.y);

    normal.normalize();
    normal2.normalize();
    initialVelocity.normalize();

    let dot_product = dotProd(initialVelocity, normal);

    if (shortestDist <= BALL_SIZE / 2) {
      let reflect = createVector(0, 0);
      // projection of velocity on normal
      // r=d−2(d⋅n)n
      reflect.x = -2 * dot_product * normal.x + initialVelocity.x;
      reflect.y = -2 * dot_product * normal.y + initialVelocity.y;
      return reflect;
    }
    return ball.vel;
  }
}

function dotProd(V1, V2) {
  return V1.x * V2.x + V1.y * V2.y;
}

function keyPressed() {
  keys[keyCode] = true;
}

function keyReleased() {
  keys[keyCode] = false;
}

class Background {
  constructor(platform) {
    this.platformSize = platform;

  }
  show() {
    let h = 4 * height / 5;
    // behind
    push();
    // pointLight(255, 255, 255, 0, 0, 500);
    fill(0, 70, 50);
    noStroke();
    translate(0, 0, -h / 4);
    plane(width, height);
    pop();
    // down
    push();
    fill(0, 70, 50);
    noStroke();
    translate(0, height / 2);
    rotateX(PI / 2);
    plane(width, h / 2);
    pop();
    // up
    push();
    fill(0, 70, 50);
    noStroke();
    translate(0, -height / 2);
    rotateX(-PI / 2);
    plane(width, h / 2);
    pop();
    // left
    fill(255, 0, 0, 70);
    noStroke();
    push();
    translate(-width / 2, -height / 2 + height / 20);
    rotateY(PI / 2);
    plane(h / 2, height / 10);
    pop();
    push();
    translate(-width / 2, height / 2 - height / 20);
    rotateY(PI / 2);
    plane(h / 2, height / 10);
    pop();
    //right
    fill(0, 0, 255, 70);
    noStroke();
    push();
    translate(width / 2, -height / 2 + height / 20);
    rotateY(-PI / 2);
    plane(h / 2, height / 10);
    pop();
    push();
    translate(width / 2, height / 2 - height / 20);
    rotateY(-PI / 2);
    plane(h / 2, height / 10);
    pop();
    // goals
    // left goal
    stroke(255);
    strokeWeight(5);
    fill(0, 50);
    push();
    translate(-width / 2, 0);
    box(1, h, h / 2);
    pop();
    // right goal
    push();
    translate(width / 2, 0);
    box(1, h, h / 2);
    pop();
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pfSize = 4 * width / 5;
  B1 = new Background(pfSize);
  Player1 = new Player();
  ball = new Ball(0, 0);
}

function draw() {
  background(10);
  pointLight(255, 255, 255, 0, 0, 100);
  // orbitControl();
  camera(0, 0, 800, ball.pos.x * 0.2, ball.pos.y * 0.2, 0);
  B1.show();
  ball.show();
  ball.update();
  ball.reflect(Player1);
  Player1.show();
  Player1.handleKeys();
  Player1.update(ball);
}