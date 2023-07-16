let L1, L2, L3, L4, L5;


function setup() {
  createCanvas(windowWidth, windowHeight);
  L1 = createGraphics(windowWidth, windowHeight);
  L2 = createGraphics(windowWidth, windowHeight);
  L3 = createGraphics(windowWidth, windowHeight);
  L4 = createGraphics(windowWidth, windowHeight);
  L5 = createGraphics(windowWidth, windowHeight);
  background(0);
  L1.background(0, 50);               // 20% transparent black background
  L2.background(0, 50);               // 20% transparent black background
  L3.background(0, 50);               // 20% transparent black background
  L4.background(0, 50);               // 20% transparent black background
  L5.background(0, 50);               // 20% transparent black background

}

function draw() {
  circle(100, 100, 40);
  L1.circle(200, 100, 40);
  L2.circle(300, 100, 40);
  L3.circle(400, 100, 40);
  L4.circle(500, 100, 40);
  L5.circle(600, 100, 40);
  image(L1, 0, 0);
  image(L2, 0, 0);
  image(L3, 0, 0);
  image(L4, 0, 0);
  image(L5, 0, 0);

}