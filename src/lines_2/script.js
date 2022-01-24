const MAX_HEIGHT = (window.innerHeight * 2) / 3;
const MAX_WIDTH = (window.innerWidth * 2) / 3;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noLoop();
}

function draw() {
  for (x = 0; x < 100; x++) {
    c = 30;

    x1 = random(10, 30);
    y1 = random(10,120);
    x2 = x1 + 10;
    y2 = y1 + 10;

    r1 = random(10, 40);
    r2 = random(-5, 15);
    r4 = random(15, 17);
    r5 = random (3,7)
    r6 = random(1,1)
    for (let i = 0; i < 150; i++) {
      x1 = x2;
      y1 = y2;
      x2 = x2 + r4;
      y2 = y2 + r1;
      r1 -= 1;

      a = 20 + Math.abs(x2 - y2) / r6;
      b = 20 + Math.abs(x2 - y2) / 3;
      c = c + r5;
      r3 = random(-15, 15);
      stroke(a + r3, b + r3, c + r3);
      line(x1, y1, x2, y2);
    }
  }
}
