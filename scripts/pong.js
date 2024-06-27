const BALL_SIZE = 20;
const SPEED = 10;
let Player1;
let B1;
let ball;
let pfSize = 500;
let keys = {};
let font;

function dotProd(V1, V2) {
  return V1.x * V2.x + V1.y * V2.y;
}

function keyPressed() {
  keys[keyCode] = true;
}

function keyReleased() {
  keys[keyCode] = false;
}


class Ball {
  constructor(x = width / 2, y = height / 2) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-2, 2), 0);
    this.fac = SPEED;
  }

  update() {
    this.vel.normalize();
    this.pos.x += this.vel.x * this.fac;
    this.pos.y += this.vel.y * this.fac;
    if (this.pos.x < -width / 2 + BALL_SIZE / 2 || this.pos.x > width / 2 - BALL_SIZE / 2) this.vel.x = -this.vel.x;
    if (this.pos.y < -height / 2 + BALL_SIZE / 2 || this.pos.y > height / 2 - BALL_SIZE / 2) this.vel.y = -this.vel.y;
    if (this.fac != SPEED) this.fac += this.fac > SPEED ? -0.5 : 0.5;
    // debug
    if (this.pos.x < -width / 2) this.pos.x += 5;
    if (this.pos.x > width / 2) this.pos.x -= 5;
    if (this.pos.y < -height / 2) this.pos.y += 5;
    if (this.pos.y > height / 2) this.pos.y -= 5;
  }

  reflect(players) {
    if (dist(players.line_1, players.pos_1, this.pos.x, this.pos.y) < players.size - BALL_SIZE / 2) {
      this.vel = players.hit(this);
    }
    if (dist(players.line_2, players.pos_2, this.pos.x, this.pos.y) < players.size - BALL_SIZE / 2) {
      this.vel = players.hit(this);
    }
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    ambientLight(150);
    specularMaterial(250);
    noStroke();
    fill(200);
    sphere(BALL_SIZE);
    pop();
  }
}

class Players {
  constructor() {
    this.size = height / 8;
    this.glow_1 = 80;
    this.glow_2 = 80;
    this.rot_1 = 0;
    this.rot_2 = 0;
    this.pos_1 = 0;
    this.pos_2 = 0;
    this.line_1 = width / 2 - this.size;
    this.line_2 = -width / 2 + this.size;
    this.rAcc_1 = 0;
    this.rAcc_2 = 0;
  }

  show() {
    // player 1
    push();
    ambientLight(250);
    stroke(this.glow_1, 0, 0);
    translate(this.line_1, this.pos_1, 0);
    rotateZ(this.rot_1);
    fill(255, this.glow_1);
    box(this.size / 10, this.size, this.size);
    pop();
    // player 2
    push();
    ambientLight(250);
    stroke(0, 0, 50 + this.glow_2);
    translate(this.line_2, this.pos_2, 0);
    rotateZ(this.rot_2);
    fill(255, this.glow_2);
    box(this.size / 10, this.size, this.size);
    pop();
  }

  handleKeys() {
    const rotationSpeed = 0.01;
    const positionSpeed = 12;

    if (keys[UP_ARROW]) this.pos_1 -= positionSpeed;
    if (keys[DOWN_ARROW]) this.pos_1 += positionSpeed;
    if (keys[LEFT_ARROW]) this.rAcc_1 -= rotationSpeed;
    if (keys[RIGHT_ARROW]) this.rAcc_1 += rotationSpeed;
    if (keys[87]) this.pos_2 -= positionSpeed;
    if (keys[83]) this.pos_2 += positionSpeed;
    if (keys[65]) this.rAcc_2 -= rotationSpeed;
    if (keys[68]) this.rAcc_2 += rotationSpeed;
  }

  update() {
    if (this.glow_1 > 80) this.glow_1 -= 10; else this.glow_1 = 80;
    if (this.glow_2 > 80) this.glow_2 -= 10; else this.glow_2 = 80;

    this.pos_1 = constrain(this.pos_1, -height / 2 + this.size / 2, height / 2 - this.size / 2);
    this.rAcc_1 = constrain(this.rAcc_1, -2, 2);
    this.rot_1 += this.rAcc_1;
    this.rot_1 = this.rot_1 % PI;

    this.pos_2 = constrain(this.pos_2, -height / 2 + this.size / 2, height / 2 - this.size / 2);
    this.rAcc_2 = constrain(this.rAcc_2, -1, 1);
    this.rot_2 += this.rAcc_2;
    this.rot_2 = this.rot_2 % PI;

    if (this.rAcc_1 != 0) this.rAcc_1 *= 0.9;
    if (this.rAcc_2 != 0) this.rAcc_2 *= 0.9;

  }

  hit(ball) {
    let A = createVector(this.line_1 - (this.size / 2) * sin(-this.rot_1), this.pos_1 - (this.size / 2) * cos(-this.rot_1));
    let B = createVector(this.line_1 + (this.size / 2) * sin(-this.rot_1), this.pos_1 + (this.size / 2) * cos(-this.rot_1));
    let A2 = createVector(this.line_2 - (this.size / 2) * sin(-this.rot_2), this.pos_2 - (this.size / 2) * cos(-this.rot_2));
    let B2 = createVector(this.line_2 + (this.size / 2) * sin(-this.rot_2), this.pos_2 + (this.size / 2) * cos(-this.rot_2));
    let normal_1 = createVector(-this.size * cos(this.rot_1) / 2, -this.size * sin(this.rot_1) / 2);
    let normal_2 = createVector(-this.size * cos(this.rot_2) / 2, -this.size * sin(this.rot_2) / 2);
    let initialVelocity = createVector(ball.vel.x, ball.vel.y);
    let shortestDist_1 = abs((A.y - B.y) * ball.pos.x - (A.x - B.x) * ball.pos.y + (A.x * B.y - A.y * B.x)) / sqrt((A.y - B.y) ** 2 + (A.x - B.x) ** 2);
    let shortestDist_2 = abs((A2.y - B2.y) * ball.pos.x - (A2.x - B2.x) * ball.pos.y + (A2.x * B2.y - A2.y * B2.x)) / sqrt((A2.y - B2.y) ** 2 + (A2.x - B2.x) ** 2);

    // line(this.line_1, this.pos_1, this.line_1 + normal_1.x, this.pos_1 + normal_1.y);
    // line(this.line_2, this.pos_2, this.line_2 - normal_2.x, this.pos_2 - normal_2.y);

    normal_1.normalize();
    normal_2.normalize();
    initialVelocity.normalize();

    let dotProduct_1 = dotProd(initialVelocity, normal_1);
    let dotProduct_2 = dotProd(initialVelocity, normal_2);


    if (shortestDist_1 < BALL_SIZE / 2) {
      // r=d−2(d⋅n)n
      let reflect = createVector(initialVelocity.x - 2 * dotProduct_1 * normal_1.x, initialVelocity.y - 2 * dotProduct_1 * normal_1.y);
      this.glow_1 = 255;
      ball.fac += abs(dotProduct_1 * this.rAcc_1) * SPEED ** 2.5;
      return reflect;
    }
    if (shortestDist_2 < BALL_SIZE / 2) {
      let reflect = createVector(initialVelocity.x - 2 * dotProduct_2 * normal_2.x, initialVelocity.y - 2 * dotProduct_2 * normal_2.y);
      this.glow_2 = 255;
      ball.fac += abs(dotProduct_2 * this.rAcc_2) * SPEED ** 2.5;
      return reflect;
    }
    return ball.vel;
  }
}


class Background {
  constructor(platform) {
    this.platformSize = platform;
    this.leftGlow = 80;
    this.rightGlow = 80;
    this.goalPost = 0;
    this.leftGoals = 0;
    this.rightGoals = 0;
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
    fill(this.leftGlow, 0, 0);
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
    fill(0, 0, this.rightGlow);
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
    stroke(255, this.leftGlow - 80);
    box(0, h + (80 - this.leftGlow), h / 2 + (80 - this.leftGlow));
    pop();
    // right goal
    push();
    translate(width / 2, 0);
    box(0, h, h / 2);
    stroke(255, this.rightGlow - 80);
    box(0, h + (80 - this.rightGlow), h / 2 + (80 - this.rightGlow));
    pop();
    // boundary
    noFill();
    push();
    translate(0, 0, h / 4);
    box(width, height, 0);
    pop();
    push();
    translate(0, 0, -h / 4);
    box(width, height, 0);
    pop();
    // score
    push();
    fill(80, 80, this.rightGlow, this.rightGlow);
    textFont(font);
    textSize(80 + this.rightGlow / 3);
    textAlign(CENTER, CENTER);
    text(this.leftGoals, -width / 10, 0);
    pop();
    push();
    fill(this.leftGlow, 80, 80, this.leftGlow);
    textFont(font);
    textSize(80 + this.leftGlow / 3);
    textAlign(CENTER, CENTER);
    text(this.rightGoals, width / 10, 0);
    pop();
  }

  reset() {
    if (this.leftGlow > 80) this.leftGlow -= 5;
    else this.leftGlow = 80;

    if (this.rightGlow > 80) this.rightGlow -= 5;
    else this.rightGlow = 80;

  }

  isGoal(ball) {
    let h = height / 8;
    if (ball.pos.y < height / 2 - h && ball.pos.y > -height / 2 + h) {
      if (ball.pos.x <= - width / 2 + BALL_SIZE / 2) {
        this.leftGlow = 255;
        this.rightGoals++;
      }
      if (ball.pos.x >= width / 2 - BALL_SIZE / 2) {
        this.rightGlow = 255;
        this.leftGoals++;
      }
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pfSize = 4 * width / 5;
  B1 = new Background(pfSize);
  Player1 = new Players();
  ball = new Ball(0, 0);
  font = loadFont('/store/MigaeSemibold-3zd2M.otf');
}

function draw() {
  background(10);
  pointLight(255, 255, 255, 0, 0, height / 3);
  // orbitControl();
  camera(0, 0, 850, ball.pos.x * 0.2, ball.pos.y * 0.2, 0);
  B1.show();
  ball.show();
  ball.update();
  ball.reflect(Player1);
  Player1.show();
  Player1.handleKeys();
  Player1.update(ball);
  B1.isGoal(ball);
  B1.reset();
}