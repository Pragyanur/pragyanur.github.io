class RAY {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.direction = createVector(1, 0);
  }
  intersect(wall) {
    const x1 = wall.A.x;
    const y1 = wall.A.y;
    const x2 = wall.B.x;
    const y2 = wall.B.y;

    const x3 = this.position.x;
    const y3 = this.position.y;
    const x4 = this.direction.x;
    const y4 = this.direction.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (den == 0) {
      return;
    }

    else {
      const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
      const u = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / den;
    }

    let p1, p2;

    if(t >= 0 && t <= 1 && u >= 0) {
      p1 = x1 + t * (x2 - x1);
      p2 = y1 + t * (y2 - y1);
    }
    return createVector(p1, p2);
  }
}

class WALL {
  constructor(x1, y1, x2, y2) {
    this.A = createVector(x1, y1);
    this.B = createVector(x2, y2);
  }
  show() {
    line(this.A.x, this.A.y, this.B.x, this.B.y);
  }
}