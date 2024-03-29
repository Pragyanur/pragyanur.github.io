class Colors {
  constructor() {
    this.color1 = [239, 188, 155];
    this.color2 = [251, 243, 213];
    this.color3 = [214, 218, 200];
    this.color4 = [156, 175, 170];
    this.blue1 = [227, 253, 253];
    this.blue2 = [203, 241, 245];
    this.blue3 = [166, 227, 233];
    this.blue4 = [113, 201, 206];
  }
  colorList() {
    return [this.color1, this.color2, this.color3, this.color4, this.blue1, this.blue2, this.blue3, this.blue4];
  }
}
let c = new Colors();
let circles = [];

class Circle {
  constructor(posX, posY, size, angle, speed) {
    this.position = createVector(posX, posY);
    this.diameter = size;
    this.angle = angle;
    this.speed = speed;
  }
  show() {
    noFill();
    strokeWeight(10);
    stroke(...c.blue3);
    arc(this.position.x, this.position.y, this.diameter, this.diameter, 0, this.angle);
  }
  update() {
    rotate(frameCount);
    translate(-this.position.x, -this.position.y);
  }

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  frameRate(60);
  for (let i = 0; i < 4; i++) {
    let k = new Circle(width / 2, height / 2, 100, 70, 0);
    circles.push(k);
  }
}
function draw() {
  background(20);
  for (let o of circles) {
    o.update();
    o.show();
  }
}
