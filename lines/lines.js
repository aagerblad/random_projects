const MAX_HEIGHT = (window.innerHeight * 2) / 3;
const MAX_WIDTH = (window.innerWidth * 2) / 3;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  // noLoop();
}

function draw() {
  a = 0;
  b = 0;
  c = 0;
  stroke(a, b, c);

  x1 = 0;
  y1 = 0;
  x2 = 10;
  y2 = 10;
  for (let i = 0; i < 150; i++) {
    x1 = x2;
    y1 = y2;
    r1 = random(20) - 5;
    r2 = random(20) - 5;
    r3 = random(20) - 10;
    x2 = x2 + r1;
    y2 = y2 + r2;
    a = Math.abs(x2 - y2)*2
    b = Math.abs(x2 - y2)
    c = c + 2 ;
    stroke(a, b + r3, c + r3);
    line(x1, y1, x2, y2);
  }

  // for (let i = 0, color = 20; i < MAX_HEIGHT; i+=3, color += 1) {
  //   let randomNumber = random(MAX_WIDTH);
  //   strokeWeight(1);
  //   stroke(color/3, color , 20);
  //   line(0, i , randomNumber, 0);
  //   // stroke(20, color/2, color);
  //   // line(0, randomNumber, i , 0);
  //   // line(i * 2, 0, 0, randomNumber);
  // }
  // color = 250
  // let randomNumber = random(MAX_WIDTH);
  // i = 100

  // stroke(color, color, 0);
  // line(0, i*2, randomNumber, 0);
  // stroke(0, color, color);

  // line(i * 2, 0, 0, randomNumber);
}
