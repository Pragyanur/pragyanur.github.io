const borderX = 5;
const borderY = 5;
const THETA = 5;
const SPEED = 3;
const APPLE_SIZE = 50;
let keys = {};                  // for keyboard "key" press "value" true/false
let snake, apple, apl, img;

class Snake {
  constructor(x1, y1) {
    this.x1 = x1;
    this.y1 = y1;
    this.body = [];
    this.body[0] = createVector(x1, y1);
    this.len = 5;
    // this.speed = createVector(1,0);
    this.angle = 0;
    this.size = 30;
  }
  update() {
    this.body.push(createVector(this.body[0].x, this.body[0].y));
    for (let i = this.body.length - 1; i > 0; i--) {
      if (frameCount % (this.size / SPEED) == 0) {
        this.body[i].x = this.body[i - 1].x;
        this.body[i].y = this.body[i - 1].y;
      }
    }
    if (this.body[0].x < 0 || this.body[0].x > width) this.body[0].x = width - this.body[0].x;
    if (this.body[0].y < 0 || this.body[0].y > height) this.body[0].y = height - this.body[0].y;
    this.body[0].x += SPEED * cos(this.angle);
    this.body[0].y += SPEED * sin(this.angle);
    if (this.len < this.body.length) this.body.pop();
  }
  show() {
    for (let i = this.body.length - 1; i >= 0; i--) {
      strokeWeight(2);
      stroke(0);
      fill(150, 160, 140);
      circle(this.body[i].x, this.body[i].y, this.size);
      noFill();
      stroke(255, 100);
      strokeWeight(5);
      arc(this.body[i].x, this.body[i].y, this.size - 10, this.size - 10, 360, 90);
    }
  }
  controls() {
    if (keys[LEFT_ARROW]) this.angle -= THETA;
    if (keys[RIGHT_ARROW]) this.angle += THETA;
  }
}

class Apple {
  constructor() {
    this.apple = createVector(random(borderX, width - borderX), random(borderY, height - borderY));
  }
  show() {
    // image(apl, this.apple.x - APPLE_SIZE/2, this.apple.y - APPLE_SIZE/2, APPLE_SIZE, APPLE_SIZE);
    apl.position(this.apple.x - APPLE_SIZE / 2, this.apple.y - APPLE_SIZE / 2);
    apl.size(APPLE_SIZE, APPLE_SIZE);
  }
  eaten(snake) {
    if (dist(snake.body[0].x, snake.body[0].y, this.apple.x, this.apple.y) <= (snake.size + APPLE_SIZE) / 2) {
      this.apple.x = random(borderX, width - borderX);
      this.apple.y = random(borderY, height - borderY);
      snake.len += 1;
    }
  }
}

function keyPressed() {
  keys[keyCode] = true;
}

function keyReleased() {
  keys[keyCode] = false;
}
// Load the image.
function preload() {
  // Image is 50 x 50 pixels.
  apl = createImg('/store/game store/apple.gif', '');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // apl = createImg('/store/game store/apple.gif','apple');
  // img = createGraphics(APPLE_SIZE, APPLE_SIZE);
  angleMode(DEGREES);
  frameRate(75);
  snake = new Snake(width / 2, height / 2);
  apple = new Apple();
}

function draw() {
  background(0);
  beginShape();

  snake.controls();
  snake.update();
  snake.show();
  // snake.cut();
  endShape();

  apple.show();
  apple.eaten(snake);

}