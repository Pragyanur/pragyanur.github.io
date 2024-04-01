const MAX_SPEED = 15;
const MAX_REVERSE = -6;

class Car {
  constructor(x, y, size = 10) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.angle = 0;
    this.carSpeed = 0;
    this.size = size;
    this.FoB = 0;
  }
  keyAction() {
    this.steer();
    // FORWARD
    if (keyIsDown(38)) {
      this.FoB = 1;
      if (this.carSpeed < MAX_SPEED) {
        this.accelerate(0.2);
      }
      if (this.carSpeed >= MAX_SPEED) {
        this.carSpeed = MAX_SPEED;
      }
    }
    // BACKWARD
    else if (keyIsDown(40)) {
      this.FoB = -1;
      if (this.carSpeed > MAX_REVERSE) {
        this.accelerate(-0.2);
      }
      if (this.carSpeed <= MAX_REVERSE) {
        this.carSpeed = MAX_REVERSE;
      }
    }
    if (!keyIsDown(38) && !keyIsDown(40)) {
      if (this.carSpeed > 0.2) {
        this.accelerate(-0.2);
      }
      else if (this.carSpeed < -0.2) {
        this.accelerate(0.2);
      }
      else {
        this.carSpeed = 0;
        this.FoB = 0;
      }
    }
  }

  steer() {
    let dir;
    // DIRECTION OF MOVEMENT
    dir = this.carSpeed >= 0 ? 1 : -1;
    if (this.FoB != 0) {
      if (keyIsDown(37)) {
        this.angle += dir * 3;
      }
      else if (keyIsDown(39)) {
        this.angle -= dir * 3;
      }
    }

  }

  accelerate(fac) {
    this.carSpeed += fac;
  }

  show() {
    let w = this.size;
    let l = 2 * this.size;
    translate(this.position.x, this.position.y);
    rotate(-this.angle);
    translate(-w / 2, -l / 2);
    fill(200);
    rect(0, 0, w, l);
    fill(30);
    rect(2, 0 + l / 8, w - 4, l / 7);
    rect(2, 0 + l / 2, w - 4, l / 5);
  }
  update() {

    this.velocity.x = sin(this.angle);
    this.velocity.y = cos(this.angle);
    this.velocity.normalize();
    this.position.x += this.velocity.x * this.carSpeed;
    this.position.y += this.velocity.y * this.carSpeed;

    // REPEAT CANVAS
    if (this.position.x > width) {
      this.position.x = 0;
    }
    if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    }
    if (this.position.y < 0) {
      this.position.y = height;
    }
  }

}

let car;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  car = new Car(300, 300, 20);
}

function draw() {
  background(50);
  car.keyAction();
  car.update();
  car.show();
}