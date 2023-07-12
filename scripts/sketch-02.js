let canvas2;
let numberOfBalls = 25;

balls = [numberOfBalls];
let ballsCounter = 0;
const diameter = 70;


class BouncingBall {
    constructor(posX, posY) {
        this.x = posX;
        this.y = posY;
        this.direction = 1;                             // +1 or -1
        this.displacement = 1;                          // vertical displacement between the pixels
        this.velocity = 0.5;                            // multiplier
        this.ground = height * 5 / 6 - 10;              // imaginary ground
        this.damping = 1.1;                             // damping factor/friction
    }

    show() {
        // shadow

        fill(200, 0, 50);
        stroke(0);
        strokeWeight(1);
        circle(this.x, this.y, diameter);
        stroke(255, 150);
        strokeWeight(10);
        arc(this.x, this.y, diameter - 15, diameter - 15, 5.2, 5.45);
        strokeWeight(5);
        arc(this.x, this.y, diameter - 10, diameter - 10, 5.8, 5.9);
        noStroke();
        fill(0, 25);
        arc(this.x, this.y, diameter - 7, diameter - 7, 1, 3, CHORD);

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
            if (this.displacement > -1 && this.displacement < 1) {
                this.y = this.ground;
                this.velocity = 0;
                this.displacement = 0;
                this.direction = 0;
            }
        }
    }
}

function setup() {
    canvas2 = createCanvas(windowWidth, windowHeight);
    canvas2.position(0, 0);
    canvas2.style('z-index', '-1');
}

function draw() {
    const offset = height / 4;
    background(40, 60, 110);

    fill(0, 200);
    noStroke();
    strokeWeight(1);
    textSize(60);
    text("Bouncing Balls: " + ballsCounter + "/25", width / 2 + 3, height / 2 + 3 + offset);             // shadow

    fill(200, 0, 50);
    stroke(0);
    rect(width / 2 + 3, height / 2 + 205, 300 + ballsCounter * 11, 10);

    fill(255);
    textSize(60);
    text("Bouncing Balls: " + ballsCounter + "/25", width / 2, height / 2 + offset);                     // text



    landscape();

    if (ballsCounter > 0) {
        for (i = 0; i < ballsCounter; i++) {
            balls[i].show();
            balls[i].update();
            balls[i].move();
        }
    }
}

function landscape() {
    fill(255);
    noStroke(0);
    rect(0, height * 5 / 6, width, height / 6);
}

function mouseClicked() {
    if (ballsCounter < 25 && mouseX > 20 && mouseX < width - 20 && mouseY > 20 && mouseY < height - 20) {
        balls[ballsCounter] = new BouncingBall(mouseX, mouseY);
        ballsCounter++;
    }
}