class Stars {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.z = 0;
  }

  update() {

  }

  show() {
    noStroke();
    fill(255);
    circle(this.x, this.y, map())
  }
}