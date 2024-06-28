const BALL_SIZE = 20;
const SPEED = 15;
let Player1;
let B1;
let ball;
let pfSize = 500;       // default box size
let keys = {};          // for keyboard "key" press "value" true/false
let font;               // load font from store
let x_min, x_max, y_min, y_max;

// dot product of two vectors in dimension = 2
function dotProd(V1, V2) {
  return V1.x * V2.x + V1.y * V2.y;
}
// if keyboard "key" is pressed then "value" = true
function keyPressed() {
  keys[keyCode] = true;
}
// if keyboard "key" is released (or another key is pressed) then "value" = false
function keyReleased() {
  keys[keyCode] = false;
}
// ball class for ball functionalities (can be optimized with Players class into one class 'game')
class Ball {
  constructor(x = 0, y = 0) {
    this.pos = createVector(x, y);                          // position in 2d plane parallel to screen z = 0
    this.vel = createVector(random(-2, 2), 0);              // velocity in 2d
    this.fac = SPEED;                                       // speed as a factor (vel * fac)
    this.radius = BALL_SIZE / 2;
  }
  update(bg) {
    this.vel.normalize();                                   // unit velocity
    // debugged ball getting stuck vertically
    if (this.vel.x == 0) this.vel.x += randomGaussian(-0.1,0.1);
    // bouncing off the walls; vertical and horizontal
    if (this.pos.x + this.vel.x * this.fac - this.radius <= x_min || this.pos.x + this.vel.x * this.fac + this.radius >= x_max) // fixed: ball moving out of the box
    { 
      this.vel.x *= -1;
      if (this.pos.y > y_min + height / 10 && this.pos.y < y_max - height / 10) 
      {
        if (this.pos.x < 0) {bg.rightGoals++;bg.leftGlow = 255;}
        if (this.pos.x > 0) {bg.leftGoals++;bg.rightGlow =255;}
      }
    }
    else this.pos.x += this.vel.x * this.fac;    // update position by incrementing with direction and speed
    if (this.pos.y + this.vel.y * this.fac - this.radius <= y_min || this.pos.y + this.vel.y * this.fac + this.radius >= y_max) this.vel.y *= -1;
    else this.pos.y += this.vel.y * this.fac;
    // reset factor gradually
    if (this.fac != SPEED) this.fac += this.fac > SPEED ? -1 : 1;
  }
  // bouncing the ball off the player boards or reflection
  reflect(players) {
    // only true when ball is near the boards
    if (dist(players.line_1, players.pos_1, this.pos.x, this.pos.y) < players.size - this.radius) {
      this.vel = players.hit(this);
    }
    if (dist(players.line_2, players.pos_2, this.pos.x, this.pos.y) < players.size - this.radius) {
      this.vel = players.hit(this);
    }
  }

  // display ball
  show() {
    push();
    translate(this.pos.x, this.pos.y);
    ambientLight(150);
    specularMaterial(250);
    noStroke();
    fill(255);
    sphere(BALL_SIZE);
    pop();
  }
}
// players definition and functionalities
class Players {
  constructor() {
    this.size = height / 8;                 // size of each board
    this.rot_1 = 0;                         // rotated angle player 1
    this.rot_2 = 0;                         // rotated angle player 2
    this.pos_1 = 0;                         // y coordinate of player 1
    this.pos_2 = 0;                         // y coordinate of player 2
    this.line_1 = width / 2 - this.size;    // x coordinate of player 1
    this.line_2 = -width / 2 + this.size;   // x coordinate of player 2
    this.rAcc_1 = 0;                        // rotation acceleration player 1
    this.rAcc_2 = 0;                        // rotation acceleration player 2
    // for dynamic visuals
    this.glow_1 = 80;
    this.glow_2 = 80;
  }
  // display player 1 and 2
  show() {
    // player 1
    push();
    ambientLight(15);
    stroke(255);
    strokeWeight(2);
    translate(this.line_1, this.pos_1, 0);
    rotateZ(this.rot_1);
    fill(this.glow_1, 0, 0);
    box(this.size / 10, this.size, this.size);
    pop();
    // player 2
    push();
    ambientLight(15);
    stroke(255);
    strokeWeight(2);
    translate(this.line_2, this.pos_2, 0);
    rotateZ(this.rot_2);
    fill(0, 0, this.glow_2);
    box(this.size / 10, this.size, this.size);
    pop();
  }
  // player controls
  handleKeys() {
    const rotationSpeed = 0.01;
    const positionSpeed = 12;

    // change y coordinate by incrementing with position speed
    // change rotation acceleration of board by incrementing with rotation speed
    // LATER THIS ACCELERATION IS USED TO UPDATE ROTATION ANGLE
    if (keys[UP_ARROW]) this.pos_1 -= positionSpeed;
    if (keys[DOWN_ARROW]) this.pos_1 += positionSpeed;
    if (keys[LEFT_ARROW]) this.rAcc_1 -= rotationSpeed;
    if (keys[RIGHT_ARROW]) this.rAcc_1 += rotationSpeed;
    // for player 2
    if (keys[87]) this.pos_2 -= positionSpeed;
    if (keys[83]) this.pos_2 += positionSpeed;
    if (keys[65]) this.rAcc_2 -= rotationSpeed;
    if (keys[68]) this.rAcc_2 += rotationSpeed;
  }
  // update player position and rotation
  update() {
    // reset glow
    this.glow_1 = this.glow_1 > 80 ? (this.glow_1 - 10) : 80;
    this.glow_2 = this.glow_2 > 80 ? (this.glow_2 - 10) : 80;
    // constrain position between the height of the box
    // constrain rotation acceleration
    // update rotated angle
    // angle = remainder of (angle / pi)
    this.pos_1 = constrain(this.pos_1, -height / 2 + this.size / 2, height / 2 - this.size / 2);
    this.rAcc_1 = constrain(this.rAcc_1, -2, 2);
    this.rot_1 += this.rAcc_1;
    this.rot_1 = this.rot_1 % PI;
    // for player 2
    this.pos_2 = constrain(this.pos_2, -height / 2 + this.size / 2, height / 2 - this.size / 2);
    this.rAcc_2 = constrain(this.rAcc_2, -1, 1);
    this.rot_2 += this.rAcc_2;
    this.rot_2 = this.rot_2 % PI;
    // rotation acceleration is reset gradually
    if (this.rAcc_1 != 0) this.rAcc_1 *= 0.9;
    if (this.rAcc_2 != 0) this.rAcc_2 *= 0.9;
  }
  // when the ball hits a board it is reflected at precisely the angle of reflection irrespective of the rotated angle of the board
  hit(ball) {
    // point A is top of board and point B is bottom of board
    // A2 and B2 respectively for player 2
    let A = createVector(this.line_1 - (this.size / 2) * sin(-this.rot_1), this.pos_1 - (this.size / 2) * cos(-this.rot_1));
    let B = createVector(this.line_1 + (this.size / 2) * sin(-this.rot_1), this.pos_1 + (this.size / 2) * cos(-this.rot_1));
    let A2 = createVector(this.line_2 - (this.size / 2) * sin(-this.rot_2), this.pos_2 - (this.size / 2) * cos(-this.rot_2));
    let B2 = createVector(this.line_2 + (this.size / 2) * sin(-this.rot_2), this.pos_2 + (this.size / 2) * cos(-this.rot_2));
    // normal vectors of the player boards (perpendicular to the surface)
    let normal_1 = createVector(-this.size * cos(this.rot_1) / 2, -this.size * sin(this.rot_1) / 2);
    let normal_2 = createVector(-this.size * cos(this.rot_2) / 2, -this.size * sin(this.rot_2) / 2);
    // unit normal vectors
    normal_1.normalize();
    normal_2.normalize();
    // ball's initial velocity; normalized
    let initialVelocity = createVector(ball.vel.x, ball.vel.y);
    initialVelocity.normalize();
    // calculating shortest distance between ball position and the boards (player 1 and player 2)
    let shortestDist_1 = abs((A.y - B.y) * ball.pos.x - (A.x - B.x) * ball.pos.y + (A.x * B.y - A.y * B.x)) / sqrt((A.y - B.y) ** 2 + (A.x - B.x) ** 2);
    let shortestDist_2 = abs((A2.y - B2.y) * ball.pos.x - (A2.x - B2.x) * ball.pos.y + (A2.x * B2.y - A2.y * B2.x)) / sqrt((A2.y - B2.y) ** 2 + (A2.x - B2.x) ** 2);
    // dot product of ball's velocity with the normal vector of the boards (player 1 and player 2)
    let dotProduct_1 = dotProd(initialVelocity, normal_1);
    let dotProduct_2 = dotProd(initialVelocity, normal_2);
    // board normals for debugging
    // line(this.line_1, this.pos_1, this.line_1 + normal_1.x, this.pos_1 + normal_1.y);
    // line(this.line_2, this.pos_2, this.line_2 - normal_2.x, this.pos_2 - normal_2.y);

    // if shortest distance between board and ball is less than half of ball's diameter
    if (shortestDist_1 < BALL_SIZE / 2) {
      this.glow_1 = 255;
      // calculate reflected velocity vector using: r=d−2(d⋅n)n
      let reflect = createVector(initialVelocity.x - 2 * dotProduct_1 * normal_1.x, initialVelocity.y - 2 * dotProduct_1 * normal_1.y);
      // ball_speed_increase is proportional to rotation acceleration and dot product of velocity with board normal
      ball.fac += abs(dotProduct_1 * this.rAcc_1) * SPEED ** 2.5;
      return reflect;
    }
    // for player 2
    if (shortestDist_2 < BALL_SIZE / 2) {
      this.glow_2 = 255;
      let reflect = createVector(initialVelocity.x - 2 * dotProduct_2 * normal_2.x, initialVelocity.y - 2 * dotProduct_2 * normal_2.y);
      ball.fac += abs(dotProduct_2 * this.rAcc_2) * SPEED ** 2.5;
      return reflect;
    }
    return ball.vel;    // return initial velocity if not hit
  }
}
// the bounding box
class Background {
  constructor(/*platform*/) {
    // this.platformSize = platform;
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
  // isGoal(ball) {
  //   let h = height / 8;
  //   if (ball.pos.y < height / 2 - h && ball.pos.y > -height / 2 + h) {
  //     if () {
  //       this.leftGlow = 255;
  //     }
  //     if (ball.goal('right')) {
  //       this.rightGlow = 255;
  //     }
  //   }
  // }
}
// main setup
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  x_max = width / 2;
  x_min = -x_max;
  y_max = height / 2;
  y_min = -y_max;

  pfSize = 4 * width / 5;
  B1 = new Background(pfSize);
  Player1 = new Players();
  ball = new Ball(0, 0);
  font = loadFont('/store/MigaeSemibold-3zd2M.otf');
}
// main loop
function draw() {
  background(0);
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
