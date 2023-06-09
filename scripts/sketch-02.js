let canvas2;
let numberOfBalls = 25;

balls = [numberOfBalls];
let ballsCounter = 0;
const diameter = 70;
const radius = diameter / 2;
const dampFactor = 1.1;
const speed = 0.5;

class BouncingBall {
    constructor(posX, posY) {
        this.x = posX;
        this.y = posY;
        this.direction = 1;                             // +1 or -1
        this.displacement = 1;                          // vertical displacement between the pixels
        this.velocity = speed;                            // multiplier
        this.ground = height * 5 / 6 - 10;              // imaginary ground
        this.damping = dampFactor;                             // damping factor/friction
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
    hold() {
        this.x = mouseX;
        this.y = mouseY;
        this.damping = dampFactor;
        this.displacement = 1;
        this.direction = 1;
        this.velocity = speed;

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


function landscape() {
    fill(255);
    noStroke(0);
    rect(0, height * 5 / 6, width, height / 6);
}

function mouseReleased() {
    if (ballsCounter < 25 && mouseX > 20 && mouseX < width - 20 && mouseY > 20 && mouseY < height - 20) {
        balls[ballsCounter] = new BouncingBall(mouseX, mouseY);
        ballsCounter++;
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
    textSize(30);
    text("Bouncing Balls: " + ballsCounter + "/25", 70, height / 2 + 3 + offset);             // shadow

    fill(200, 0, 50);
    stroke(0);
    rect(73, height / 2 + 205, ballsCounter * 11.5, 10);

    fill(255);
    textSize(30);
    text("Bouncing Balls: " + ballsCounter + "/25", 70, height / 2 + offset);                     // text

    text("You can reposition the balls once the counter reaches 25")

    landscape();

    // to hold a ball and reposition
    for (let ball of balls) {
        if(ballsCounter >= 25 && mouseIsPressed && mouseX > ball.x - radius && mouseX < ball.x + radius && mouseY > ball.y - radius && mouseY < ball.y + radius){
            ball.hold();
            break;
        }
    }
    if (ballsCounter > 0) {
        for (let i = 0; i < ballsCounter; i++) {
            balls[i].show();
            balls[i].update();
            balls[i].move();
        }
    }


}
