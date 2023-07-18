class wheelObject {
  constructor(posX, posY, size) {
    this.X = posX;
    this.Y = posY;
    this.diameter = size;
    this.xSqueeze = this.diameter * 9 / 10;
  }
  show() {
    stroke(255);
    fill(0, 100);
    ellipse(this.X + 50, this.Y, this.xSqueeze - 10, this.diameter - 10);
    stroke(200);
    fill(200, 30, 20);
    rect(this.X, this.Y - this.diameter / 2, 30, this.diameter);
    stroke(255);
    fill(0, 100);
    beginShape(POINTS);
    vertex()

    endShape();
    ellipse(this.X, this.Y, this.xSqueeze, this.diameter);
    ellipse(this.X, this.Y, this.xSqueeze - 30, this.diameter - 30);
  }

  animate() {

  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // L1 = createGraphics(windowWidth, windowHeight);
  // L2 = createGraphics(windowWidth, windowHeight);
  // L3 = createGraphics(windowWidth, windowHeight);
  // L4 = createGraphics(windowWidth, windowHeight);
  // L5 = createGraphics(windowWidth, windowHeight);
  // L1.background(0, 50);               // 20% transparent black background
  // L2.background(0, 50);               // 20% transparent black background
  // L3.background(0, 50);               // 20% transparent black background
  // L4.background(0, 50);               // 20% transparent black background
  // L5.background(0, 50);               // 20% transparent black background
}

let wheel;

function draw() {
  background(0);
  let wheel = new wheelObject(width / 2, height / 2, 250);


  wheel.show();
  // wheel.animate();
  // image(L1, 0, 0);
  // image(L2, 0, 0);
  // image(L3, 0, 0);
  // image(L4, 0, 0);
  // image(L5, 0, 0);


  // grid
  for (let x = 0; x < width; x += 20) {
    strokeWeight(1);
    stroke(150, 50);
    line(x, 0, x, width);
    line(0, x, width, x);
  }

}