const objSize = 10;
const speed = 0;

class Object {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(speed, speed);
  }

  show() {
    let centerX = width / 2;
    let centerY = height / 2;
    strokeWeight(5);
    line(centerX, centerY, centerX + this.velocity.x, centerY + this.velocity.y);
  }
}

function keyPressed() {
  if(keyCode === UP_ARROW) {

  }
}


function setup() {
  createrCanvas()

}

function draw() {

}
