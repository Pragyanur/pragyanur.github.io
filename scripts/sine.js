function frames(x,y,radius) {
  radius = radius >= 100 ? radius : 100;
  let theta = - frameCount / 100;
  let dialPos = createVector(x, y);
  let point = createVector(dialPos.x + radius * Math.cos(theta), dialPos.y + radius * Math.sin(theta));
  strokeWeight(1);
  stroke(255,255,0);
  line(dialPos.x, dialPos.y, point.x, point.y);
  stroke(255,50);
  line(dialPos.x - radius, dialPos.y, dialPos.x + radius, dialPos.y);
  line(dialPos.x, dialPos.y - radius, dialPos.x, dialPos.y + radius);
  strokeWeight(2);
  stroke(50,50,150);
  line(point.x, point.y, point.x, dialPos.y);
  stroke(150,50,50);
  line(point.x, point.y, dialPos.x, point.y);
  noFill();
  stroke(255);
  strokeWeight(1);
  circle(dialPos.x, dialPos.y, radius * 2);
  fill(255);
  noStroke();
  circle(dialPos.x, dialPos.y, 7);
  circle(point.x, point.y, 7);
  fill(255,255,0,100);
  stroke(250);
  arc(dialPos.x, dialPos.y, 50, 50, theta, 0, PIE);
  stroke(255);
  strokeWeight(1);
  fill(150,50,50);
  circle(dialPos.x, point.y, 10);
  fill(50,50,150);
  circle(point.x, dialPos.y, 10);
  return [dialPos.x, dialPos.y, point.x, point.y, radius];
}


let horizontalPoints = [];
let verticalPoints = [];

function trails(arr) {

  let radius = arr[4];
  let center = createVector(arr[0], arr[1]);
  let point = createVector(arr[2], arr[3]);
  horizontalPoints.push([center.x, point.y]);
  verticalPoints.push([point.x,center.y]);
  for (let i = 0; i < horizontalPoints.length; i++) {
    horizontalPoints[i][0] += 0.5;
    verticalPoints[i][1] += 0.5;
    noStroke();
    fill(150,50,50);
    circle(horizontalPoints[i][0], horizontalPoints[i][1], 2);
    fill(50,50,150);
    circle(verticalPoints[i][0], verticalPoints[i][1], 2);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  let arr = frames(width/4, height/4, 170);
  trails(arr);
}