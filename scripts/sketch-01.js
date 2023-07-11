let canvas;
let numberOfBalls = 25;

class Ball {
    constructor(size) {
        this.radius = size / 2;
        this.diameter = size;
        this.posX = random(0 + this.radius, width - this.radius);
        this.posY = random(0 + this.radius, height - this.radius);
        this.speedX = random(-3, 3);
        this.speedY = random(-3, 3);
        this.randomColorChange();
    }

    show() {
        fill(this.r, this.g, this.b, 50)
        stroke(255);
        strokeWeight(1);
        circle(this.posX, this.posY, this.diameter);
        strokeWeight(3);
        noFill();
        arc(this.posX, this.posY, this.diameter * 6 / 7, this.diameter * 6 / 7, 5, 5.7);
        arc(this.posX, this.posY, this.diameter * 6 / 7, this.diameter * 6 / 7, 5.9, 6);
        stroke(this.r, this.g, this.b, 150)
        arc(this.posX, this.posY, this.diameter * 6 / 7, this.diameter * 6 / 7, 2, 3);
    }

    move() {
        this.posX += this.speedX;
        this.posY += this.speedY;
    }

    bounce() {
        if (this.posX > width - this.radius || this.posX < 0 + this.radius) {
            this.speedX = -this.speedX;
            this.randomColorChange();
        }
        if (this.posY > height - this.radius || this.posY < 0 + this.radius) {
            this.speedY = -this.speedY;
            this.randomColorChange();
        }
    }

    randomColorChange() {
        this.r = random(50, 255);
        this.g = random(50, 255);
        this.b = random(50, 255);
    }
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-2');

    b = [numberOfBalls];

    for (i = 0; i < numberOfBalls; i++) {
        b[i] = new Ball(random(50, 200));
    }
}

function draw() {
    background(20, 0, 10);

    for (i = 0; i < numberOfBalls; i++) {
        b[i].show();
        b[i].bounce();
        b[i].move();
    }
}