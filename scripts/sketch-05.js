const MAX_SPEED = -15;
const MAX_REVERSE = 15;
const MAX_STEER = 5;


const carSpeed = 2;
const steerSpeed = 1;

const zeroing = 0.3;
const steerback = 1;

const wheelPosition = 20;

let car;

function setup() {
  createCanvas(windowWidth, windowHeight);
  class Vec {
    constructor() {
      this.position = createVector(width / 2, height / 2);
      this.velocity = createVector(0, 0);
    }

    show() {
      strokeWeight(5);
      stroke(0);
      line(this.position.x - wheelPosition, this.position.y, this.position.x + this.velocity.x - wheelPosition, this.position.y + wheelPosition);
      line(this.position.x + wheelPosition, this.position.y, this.position.x + this.velocity.x + wheelPosition, this.position.y + wheelPosition);

      strokeWeight(10);
      stroke(map(this.velocity.y, MAX_SPEED, MAX_REVERSE, 0, 255), map(this.velocity.y, MAX_SPEED, MAX_REVERSE, 255, 0), 0);
      line(this.position.x, this.position.y, this.position.x, this.position.y + this.velocity.y);
    }

    update() {
      this.deAcceleration();
      this.rePositionSteering();
      this.position.y += this.velocity.y;
      this.position.x += this.velocity.x;
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

    deAcceleration() {
      let deacceleration = zeroing;
      if (this.velocity.x != 0) {
        deacceleration = zeroing + 0.3;
      }
      else this.velocity.x = 0;

      if (this.velocity.y < 0) {
        this.velocity.y += deacceleration;
      }
      else this.velocity.y -= deacceleration;
    }

    rePositionSteering() {
      if (!keyIsDown(37) && !keyIsDown(39)) {
        this.velocity.x += (this.velocity.x < 0) * steerback - (this.velocity.x > 0) * steerback; // minimizing conditions
      }
    }

    keyAction() {
      // accelerating
      if (keyIsDown(38) && this.velocity.y >= MAX_SPEED) {
        this.velocity.y -= carSpeed;
      }
      else if (keyIsDown(40) && this.velocity.y <= MAX_REVERSE) {
        this.velocity.y += carSpeed;
      }
      // steering
      if (keyIsDown(37) && this.velocity.x >= -MAX_STEER) {
        this.velocity.x -= steerSpeed;
      }
      else if (keyIsDown(39) && this.velocity.x <= MAX_STEER) {
        this.velocity.x += steerSpeed;
      }
    }
  }

  // object for representation
  car = new Vec();
}

function draw() {
  background(150);
  car.show();
  car.update();
  car.keyAction();
}
