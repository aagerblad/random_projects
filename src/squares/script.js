ROWS = 30;
COLS = ROWS;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  // noLoop();
  r_1 = 100;

  changes = [1, 1, 1];
  dir = [1, 1, 1];
  m = [50, 30, 50];
}

function draw() {
  // noStroke();

  changes.map(function (x, idx) {
    x = x + dir[idx];
    if (x >= m[idx]) {
      dir[idx] = dir[idx] * -1;
    } else if (x <= 0) {
      dir[idx] = dir[idx] * -1;
    }
    changes[idx] = x;
  });

  w = width / COLS;
  h = height / ROWS;

  for (i = 0; i < COLS; i++) {
    for (j = 0; j < ROWS; j++) {
      color_fun(i, j);
      rect(i * w, j * h, w, h);
      // circle(i * w, j * h, w * 0.8);
    }
  }
}

function color_fun(i, j) {
  x = i / COLS;
  y = j / ROWS;

  r = cr(x * (1 - y)) + changes[0];
  g = cr(y * (1 - x)) + changes[1];
  // b = cr((1 - x) * (1 - y)) + changes[2];
  b = 200 + changes[2];

  fill(r, g, b);
}

function cr(p) {
  return cal_range(10, 255, p);
}

function cal_range(a, b, p) {
  val = a + (b - a) * p;
  if (val >= b) {
    return b;
  } else if (val <= a) {
    return a;
  } else {
    return val;
  }
}
