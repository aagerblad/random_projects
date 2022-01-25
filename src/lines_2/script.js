function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  // noLoop();
  lines = [get_line()];
  counter = 0
}

function draw() {
  next_step();
  background("#222");

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].steps.length == 0) {
      lines.splice(i, 1);
      continue;
    }
    for (let j = 0; j < lines[i].steps.length; j++) {
      if (lines[i].steps[j].life <= 0) {
        lines[i].steps.splice(j, 1);
        continue;
      }
      with (lines[i]) {
        with (steps[j]) {
          life -= 0.01
          red = max(a * life, 32);
          green = max(b * life, 32);
          blue = max(c * life, 32);
          stroke(red, green, blue);
          strokeWeight(stroke_weight);
          line(x1, y1, x2, y2);
        }
      }
    }
  }
}

function get_line() {
  return {
    x1: 0,
    y1: random(0, window.innerHeight),
    c: 30,
    r0: random(0, window.innerHeight),
    r1: random(0, 30),
    r2: random(-5, 15),
    r4: random(20, 23),
    r5: random(3, 9),
    r6: random(1, 1),
    stroke_weight: random(1, 5),
    opac: 255,
    it: 0,
    steps: [],
  };

}

function next_step() {
  if (random(0, 10) < 1) {
    lines.push(get_line());
  }

  for (let i = 0; i < lines.length; i++) {
    with (lines[i]) {
      if (y1 >= 0 && x1 >= 0) {
        x2 = x1 + r4;
        y2 = y1 + r1;
        r1 -= 1;
        opac -= 2;
        it += 1;

        a = 256 - Math.abs(x2 - y2) / 7;
        b = 40 + Math.abs(x2 - y2) / 3;
        c = c + r5;
        r3 = random(-15, 15);

        steps.unshift({
          a: a + r3 + c / 5,
          b: b + r3 + c / 3,
          c: c + r3 + c,
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
          life: 1,
        });

        x1 = x2;
        y1 = y2;
      }
    }
  }
}
