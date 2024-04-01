const MAX_SPEED = 15;
const MAX_REVERSE = -6;

class Car {
  constructor(x, y, size = 10) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.angle = 0;
    this.carSpeed = 0;
    this.size = size;
    this.f_b = 0;
  }
  keyAction() {
    this.steer();
    if (keyIsDown(38)) {
      this.f_b = 1;
      if (this.carSpeed < MAX_SPEED) {
        this.accelerate(0.2);

      }
      if (this.carSpeed >= MAX_SPEED) {
        this.carSpeed = MAX_SPEED;
      }
    }
    else if (keyIsDown(40)) {
      this.f_b = -1;
      if (this.carSpeed > MAX_REVERSE) {
        this.accelerate(-0.2);
      }
      if (this.carSpeed <= MAX_REVERSE) {
        this.carSpeed = MAX_REVERSE;
      }
    }
    if (!keyIsDown(38) && !keyIsDown(40)) {
      if (this.carSpeed > 0) {
        this.accelerate(-0.2);
      }
      this.autoBrake();
    }
  }

  autoBrake() {
    if (this.carSpeed < 1.5) {
      this.carSpeed = 0;
      this.f_b = 0;
    }
  }

  steer() {
    if (keyIsDown(37)) {
      this.angle += this.f_b * 3;
    }
    else if (keyIsDown(39)) {
      this.angle -= this.f_b * 3;
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
    fill(50);
    rect(2, 0 + l / 8, w - 4, l / 7);
    rect(2, 0 + l / 2, w - 4, l / 5);
  }
  update() {
    this.velocity.x = sin(this.angle);
    this.velocity.y = cos(this.angle);
    this.velocity.normalize();
    this.position.x += this.velocity.x * this.carSpeed;
    this.position.y += this.velocity.y * this.carSpeed;
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