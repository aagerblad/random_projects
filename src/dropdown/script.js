const MAX_HEIGHT = window.innerHeight;
const MAX_WIDTH = (window.innerWidth * 2) / 3;
let x1;
let y1;

let x;
let y;

let timer

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  // noLoop();

  x = [["A"]];
  timer = 0
}

function draw() {
  timer = (timer + 1) % 3
  if (timer != 0) {
    return
  }
  background("#222");
  let r = random(10);

  s = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let r2 = random(s.length);
  letter = s.charAt(r2);

  if (r < 2 && x.length < 40) {
    x.push([s.charAt(random(s.length))]);
  }

  for (let i = 0; i < x.length; i++) {
    x[i].push(s.charAt(random(s.length)));
  }

  for (let i = 0; i < x.length; i++) {
    fill("#171");
    for (let j = 0; j < x[i].length - 1; j++) {
      text(x[i][j], i * 10, j * 10)
    }

    fill("#5f5");
    text(x[i][x[i].length - 1], i * 10, x[i].length * 10);

    if (x[i].length > 60 - random(20)) {
      x[i] = [s.charAt(random(s.length))];
    }
  }
}
