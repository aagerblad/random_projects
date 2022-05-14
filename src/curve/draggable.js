
class Draggable {
  constructor (x,y) {
    this.x = x;
    this.y = y;
    this.dragging = false;
    this.mouse_over = false;
  }


  show() {
    stroke(100)
    strokeWeight(1)
    if (this.mouse_over) {
      fill(150)
    } else {
      fill(200)
    }
    circle(this.x, this.y, 20);
  }

  drag() {
    if (this.dragging) {
      this.x = mouseX;
      this.y = mouseY;
    }
  }
  
  over() {
    if (mouseX > this.x - 20 && mouseX < this.x + 20 && mouseY > this.y - 20 && mouseY < this.y + 20) {
      this.mouse_over = true;
    } else {
      this.mouse_over = false;
    }
  }

  mouse_down() {
    if(this.mouse_over && mouseIsPressed) {
      this.dragging = true;
    } else {
      this.dragging = false;
    }
  }


  update() {
    this.show();
    this.drag();
    this.over();
    this.mouse_down();
  }
}
