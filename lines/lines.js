function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  for (let i = 0, color = 0; i < 50; i++, color += 3) {
    let randomNumber = random(windowWidth);
    strokeWeight(1);
    stroke(200, 0, 0);
    line(0, i * 30, 10 + randomNumber, 0);
    stroke(0, 0, 200);
    line(0, i * 30, 10 + randomNumber, 0);
  }
}
