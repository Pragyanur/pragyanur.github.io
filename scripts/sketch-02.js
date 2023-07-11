let canvas;
let numberOfBalls = 25;

balls = [numberOfBalls];
let ballsCounter = 0;
// Load the code from the GitHub repository
const code = require('https://github.com/Pragyanur/pragyanur.github.io/blob/main/scripts/sketch-02.js');

// Display the code in the HTML
document.getElementById('code').innerHTML = code;

class BouncingBall {
    constructor(posX, posY) {
        this.x = posX;
        this.y = posY;
        this.direction = 1;
        this.displacement = 1;
        this.velocity = 0.5;
        this.ground = height * 5 / 6;
        this.damping = 1.1;
    }

    show() {
        fill(200, 0, 50);
        stroke(0);
        strokeWeight(1);
        ellipse(this.x, this.y, 30);
    }

    move() {
        this.y += this.displacement;
    }

    damp() {
        this.displacement /= this.damping;
        this.damping += 0.01;
    }

    update() {
        this.displacement += this.velocity;
        this.displacement *= this.direction;

        if (this.y > this.ground && this.velocity > 0) {
            this.y = this.ground;
            this.direction = -this.direction;
            this.damp();
            if (this.displacement > -0.5 && this.displacement < 0.5) {
                this.y = this.ground;
                this.velocity = 0;
                this.displacement = 0;
                this.direction = 0;
            }
        }
    }

}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
}

function draw() {
    background(0, 0, 110);
    textSize(50);
    text("Bouncing Balls", width / 2, height / 2);
    landscape();



    if (ballsCounter > -1) {
        for (i = 0; i < ballsCounter; i++) {
            balls[i].show();
            balls[i].update();
            balls[i].move();
        }
    }
}

function landscape() {
    fill(255);
    stroke(0);
    strokeWeight(2);
    rect(0, height * 5 / 6 + 15, width, height / 6);
}

function mouseClicked() {
    if (ballsCounter < 25) {
        balls[ballsCounter] = new BouncingBall(mouseX, mouseY);
        ballsCounter++;
    }
}