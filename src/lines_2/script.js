function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  // noLoop();
  lines = []
}

function draw() {
  if(random(0, 10) < 1) {
    lines.push({
      x1: 0,
      y1: random(0, window.innerHeight),
      c: 30,
      r0: random(0, window.innerHeight),
      r1: random(0, 30),
      r2: random(-5, 15),
      r4: random(20, 23),
      r5: random(3, 9),
      r6: random(1, 1),
    })
  }


  for(let i = 0; i < lines.length; i++) {
    with(lines[i]) {
      x2 = x1 + r4;
      y2 = y1 + r1;
      r1 -= 1;

      a = 256 - Math.abs(x2 - y2) / 7;
      b = 40 + Math.abs(x2 - y2) / 3;
      c = c + r5;
      r3 = random(-15, 15);
      stroke(a + r3 + c / 5, b + r3 + c / 3, c + r3);
      strokeWeight(6);
      line(x1, y1, x2, y2);

      x1 = x2;
      y1 = y2;
    }
  }
}
