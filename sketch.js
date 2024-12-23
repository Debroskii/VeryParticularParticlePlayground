const CANV_DIMENSIONS = [1495, 820]
const FRAME_RATE = 60

function setup() {
  frameRate(FRAME_RATE)
  createCanvas(CANV_DIMENSIONS[0], CANV_DIMENSIONS[1]);
}

function draw() {
  background(0);
}

function out_of_bounds(position) {
  if(position.x > CANV_DIMENSIONS[0] || position.y > CANV_DIMENSIONS[0]) return true;
  else if(position.x < 0 || position.y < 0) return true;
  else return false;
}