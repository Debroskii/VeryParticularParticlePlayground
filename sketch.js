const CANV_DIMENSIONS = [1495, 820]
const FRAME_RATE = 60

let attr

function setup() {
  frameRate(FRAME_RATE)
  createCanvas(CANV_DIMENSIONS[0], CANV_DIMENSIONS[1]);
  attr = new EmitterAttributes(10, 1, color(255, 255, 255))
  attr.force_variation = 1
}

function draw() {
  background(0);
  print(frameRate())
  VeryParticularEngine.tick()
}

function mouseClicked() {
  VeryParticularEngine.sources.push(
    new Emitter(
      createVector(mouseX, mouseY),
      attr
    )
  )
}