const BALL_SIZE = 10;
const SPEED = 10;
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
    if (this.pos.x < -width / 2 + BALL_SIZE / 2 || this.pos.x > width / 2 - BALL_SIZE / 2) this.vel.x = -this.vel.x;
    if (this.pos.y < -height / 2 + BALL_SIZE / 2 || this.pos.y > height / 2 - BALL_SIZE / 2) this.vel.y = -this.vel.y;
    if (this.fac != 5) this.fac += this.fac > SPEED ? -1 : 1;
    // debug
    if (this.pos.x < -width / 2) this.pos.x += 5;
    if (this.pos.x > width / 2) this.pos.x -= 5;
    if (this.pos.y < -height / 2) this.pos.y += 5;
    if (this.pos.y > height / 2) this.pos.y -= 5;
  }
  reflect(player) {
    if (dist(player.line_1, player.pos_1, this.pos.x, this.pos.y) < player.size - BALL_SIZE / 2) {
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
  }
}

class Player {
  constructor() {
    this.rot_1 = 0;
    this.rot_2 = 0;
    this.pos_1 = 0;
    this.pos_2 = 0;
    this.size = height / 8;
    this.line_1 = width / 2 - this.size;
    this.line_2 = -width / 2 + this.size;
    this.rAcc_1 = 0;
    this.rAcc_2 = 0;
  }

  show() {
    push();
    ambientLight(80);
    specularMaterial(250);
    stroke(255);
    translate(this.line_1, this.pos_1, 0);
    rotateZ(this.rot_1);
    fill(255, 100);
    box(0, this.size, this.size);
    pop();
  }

  handleKeys() {
    const rotationSpeed = 0.01;
    const positionSpeed = 7;
    if (keys[UP_ARROW]) this.pos_1 -= positionSpeed;
    if (keys[DOWN_ARROW]) this.pos_1 += positionSpeed;
    if (keys[LEFT_ARROW]) this.rAcc_1 -= rotationSpeed;
    if (keys[RIGHT_ARROW]) this.rAcc_1 += rotationSpeed;
  }

  update() {
    this.pos_1 = constrain(this.pos_1, -height / 2 + this.size / 2, height / 2 - this.size / 2);
    this.rAcc_1 = constrain(this.rAcc_1, -1, 1);
    this.rot_1 += this.rAcc_1;
    this.rot_1 = this.rot_1 % PI;

    if (this.rAcc_1 != 0) this.rAcc_1 *= 0.9;
    if (this.pAcc_1 != 0) this.pAcc_1 *= 0.9;
  }

  hit(ball) {
    const bx = ball.pos.x;
    const by = ball.pos.y;

    let A = createVector(this.line_1 - (this.size / 2) * sin(-this.rot_1), this.pos_1 - (this.size / 2) * cos(-this.rot_1));
    let B = createVector(this.line_1 + (this.size / 2) * sin(-this.rot_1), this.pos_1 + (this.size / 2) * cos(-this.rot_1));
    let normal_1 = createVector(-this.size * cos(this.rot_1) / 2, -this.size * sin(this.rot_1) / 2);
    let normal_2 = createVector(-this.size * cos(this.rot_2) / 2, this.size * sin(this.rot_2) / 2);
    let initialVelocity = createVector(ball.vel.x, ball.vel.y);
    let shortestDist = abs((A.y - B.y) * bx - (A.x - B.x) * by + (A.x * B.y - A.y * B.x)) / sqrt((A.y - B.y) ** 2 + (A.x - B.x) ** 2);

    line(this.line_1, this.pos_1, this.line_1 + normal_1.x, this.pos_1 + normal_1.y);

    normal_1.normalize();
    normal_2.normalize();
    initialVelocity.normalize();

    let dotProduct_1 = dotProd(initialVelocity, normal_1);
    let dotProduct_2 = dotProd(initialVelocity, normal_2);

    if (shortestDist < BALL_SIZE / 2) {
      let reflect = createVector(0, 0);
      // r=d−2(d⋅n)n
      reflect.x = initialVelocity.x - 2 * dotProduct_1 * normal_1.x;
      reflect.y = initialVelocity.y - 2 * dotProduct_1 * normal_1.y;
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
    fill(100, 0, 0);
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
    fill(0, 0, 100);
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
    noFill();
    push();
    translate(-width / 2, 0);
    box(0, h, h / 2);
    pop();
    // right goal
    push();
    translate(width / 2, 0);
    box(0, h, h / 2);
    pop();
    // boundary
    push();
    noFill();
    translate(0, 0, h / 4);
    box(width, height, 0);
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