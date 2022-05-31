var p1x = 120;
var p1y = 120;
var p2x = 580;
var p2y = 600;
var mpx = 500;
var mpy = 140;

var gui;

function cus_bezier() {

  strokeWeight(4);
  e_x = point1.x;
  e_y = point1.y;

  s_ext_x = 0;
  s_ext_y = 0;
  for (i = 0; i < 1; i += 0.01) {
    s_x = e_x;
    s_y = e_y;
    l1_x = point1.x + i * (mid_point.x - point1.x);
    l1_y = point1.y + i * (mid_point.y - point1.y);

    l2_x = mid_point.x + i * (point2.x - mid_point.x);
    l2_y = mid_point.y + i * (point2.y - mid_point.y);

    e_x = l1_x + i * (l2_x - l1_x);
    e_y = l1_y + i * (l2_y - l1_y);

    if (i == 0.01) {
      s_ext_x = e_x;
      s_ext_y = e_y;
    }

    stroke(e_y / 5, e_x / 3, 200 * i);
    line(s_x, s_y, e_x, e_y);
  }

  e_ext_x = s_x;
  e_ext_y = s_y;

  stroke(s_ext_y / 5, s_ext_x / 3, 0);
  p_x = point1.x - (s_ext_x - point1.x) * 1000;
  p_y = point1.y - (s_ext_y - point1.y) * 1000;
  line(point1.x, point1.y, p_x, p_y);

  stroke(e_ext_y / 5, e_ext_x / 3, 200);
  p_x = point2.x - (e_ext_x - point2.x) * 1000;
  p_y = point2.y - (e_ext_y - point2.y) * 1000;
  line(point2.x, point2.y, p_x, p_y);

}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  point1 = new Draggable(p1x, p1y);
  point2 = new Draggable(p2x, p2y);
  mid_point = new Draggable(mpx, mpy);
}

function draw() {
  background("#222");

  cus_bezier();

  point1.update();
  point2.update();
  mid_point.update();
}
