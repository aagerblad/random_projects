function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  // noLoop();
  loops = 0;
}

function draw() {
  if (loops < 100) {
    loops += 1;
    c = 30;

    r0 = random(0, 800);
    r1 = random(0, 30);
    r2 = random(-5, 15);
    r4 = random(20, 23);
    r5 = random(3, 9);
    r6 = random(1, 1);

    x1 = 0;
    y1 = r0;
    x2 = x1;
    y2 = y1;
    for (let i = 0; i < 150; i++) {
      x1 = x2;
      y1 = y2;
      x2 = x2 + r4;
      y2 = y2 + r1;
      r1 -= 1;

      a = 256 - Math.abs(x2 - y2) / 7;
      b = 40 + Math.abs(x2 - y2) / 3;
      c = c + r5;
      r3 = random(-15, 15);
      stroke(a + r3 + c / 5, b + r3 + c / 3, c + r3);
      line(x1, y1, x2, y2);
    }
  }
}
