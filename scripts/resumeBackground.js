let canvas1;

function setup() {
  canvas1 = createCanvas(windowWidth, windowHeight);
  canvas1.position(0, 0);
  canvas1.style('z-index', '-1');
}

function draw() {
  noStroke();
  fill(0, 100)
  circle(mouseX, mouseY, 100);
}