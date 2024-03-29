const MAX_SPEED = 100;
const MAX_REVERSE = 60;

class Car {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.angle = 0;
    this.angle = constrain(this.angle, 0, 359);
    this.carSpeed = 0;
    this.carSpeed = constrain(this.carSpeed, 0, 30);
  }
  keyAction() {
    if (keyIsDown(37)) {
      this.angle -= 1;
    }
    else if (keyIsDown(39)) {
      this.angle += 1;
    }
    if (keyIsDown(38)) {
      this.accelerate();
      this.update(1);
    }
    else if (keyIsDown(40)) {
      this.deaccelerate();
    }

  }
  accelerate() {
    if (this.carSpeed < MAX_SPEED)
      this.carSpeed += 1;
  }
  deaccelerate() {
    this.carSpeed -= 1;
  }
  updateVelocity() {
    this.velocity.x = sin(this.angle);
    this.velocity.y = cos(this.angle);
    this.velocity.normalize();
  }
  show() {
    translate(this.position.x, this.position.y);
    rotate(-this.angle);
    translate(-20, -35);
    rect(0, 0, 40, 70);
  }
  update(f_b) {
    let forward = -1 * f_b;
    this.position.x += forward * (this.velocity.x * this.carSpeed);
    this.position.y += forward * (this.velocity.y * this.carSpeed);
  }
}

let car;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  car = new Car(300, 300);
}

function draw() {
  background(20);
  car.keyAction();
  car.updateVelocity();
  car.show();
}