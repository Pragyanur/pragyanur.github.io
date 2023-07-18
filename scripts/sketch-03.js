let pos = 0;

function setup() {
  bg = createCanvas(windowWidth, windowHeight);
  bg.position(0,0);
  bg.style('z-index', -1);

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


function draw() {

  background(0);

  // wheel.animate();
  // image(L1, 0, 0);
  // image(L2, 0, 0);
  // image(L3, 0, 0);
  // image(L4, 0, 0);
  // image(L5, 0, 0);

  // grid
  for (let x = 0; x < width; x += 20) {
    strokeWeight(1);
    stroke(255, 30);
    line(x, 0, x, width);
    line(0, x, width, x);
  }
}