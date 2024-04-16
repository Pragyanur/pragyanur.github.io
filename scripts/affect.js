class Ball {
  constructor() {
    this.position = createVector(random(5, width - 5), random(5, height - 5));
    this.velocity = createVector(random(-1, 1), random(-1, 1));
  }
  show() {
    noStroke();
    fill(255);
    circle(this.position.x, this.position.y, 3);
  }
  update() {
    // stay in screen
    if (this.position.x > width) this.position.x = 0;
    if (this.position.x < 0) this.position.x = width;
    if (this.position.y > height) this.position.y = 0;
    if (this.position.y < 0) this.position.y = height;
    // change position
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
  interact(j, balls) {
    for (let i = 0; i < N; i++) {
      if (i != j) {
        let distance = dist(this.position.x, this.position.y, balls[i].position.x, balls[i].position.y);
        if (distance < T) {
          let lightness = map(distance, 0, T, 255, 0);
          stroke(lightness, random(100), random(200));
          strokeWeight(lightness * 0.005);
          line(this.position.x, this.position.y, balls[i].position.x, balls[i].position.y);
          let fac = map(lightness, 1, 200, 0.1, 0.4);
          this.position.x += fac * balls[i].velocity.x;
          this.position.y += fac * balls[i].velocity.y;
        }
      }
    }
  }
}

let balls = [];
const N = 150;
const T = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  for (let i = 0; i < N; i++) {
    let b = new Ball;
    balls.push(b);
  }
}

function draw() {
  background(0);
  for (let i = 0; i < N; i++) {
    balls[i].interact(i, balls);
    balls[i].update();
    balls[i].show();
  }
}