let canvas;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
}

function draw() {
    textSize(50);
    text("BRAVE NEW WORLD", width / 2, height / 2);
}