const DIMENSIONS = [1495, 820]
const FRAME_RATE = 60

function setup() {
  document.addEventListener('contextmenu', event => event.preventDefault())
  frameRate(FRAME_RATE)
  createCanvas(DIMENSIONS[0], DIMENSIONS[1]);
  Config.init()
  UI.create()
}

function draw() {
  background(0)
  noStroke()
  UI.update()
  VeryParticularEngine.tick()
}

function mousePressed() {
  for(let panel of UI.panels) {
    panel.pressed()
  }
  for(const affector of VeryParticularEngine.affectors) {
    affector.pressed()
  }
  for(const source of VeryParticularEngine.sources) {
    source.pressed()
  }

  if(keyIsDown(SHIFT)) {
    if(mouseButton === LEFT) {
      VeryParticularEngine.sources.push(new Emitter(createVector(mouseX, mouseY)))
    } else if (mouseButton === RIGHT) {
      VeryParticularEngine.affectors.push(new Affector(createVector(mouseX, mouseY), 0))
    }
  } else if(keyIsDown(32)) {
    if(mouseButton === LEFT) {
      VeryParticularEngine.launch_sources.push(new LaunchEmitter(createVector(mouseX, mouseY)))
    }
  }
}

function mouseReleased() {
  for(let panel of UI.panels) {
    panel.released()
  }
  for(const affector of VeryParticularEngine.affectors) {
    affector.released()
  }
  for(const source of VeryParticularEngine.sources) {
    source.released()
  }
  for(const source of VeryParticularEngine.launch_sources) {
    source.released()
  }
}

function keyPressed() {
  if(key === "e") {
    for(const affector of VeryParticularEngine.affectors) {
      affector.edit()
    }
    for(const source of VeryParticularEngine.sources) {
      source.edit()
    }
  } else if(key === "x") {
    for(const affector of VeryParticularEngine.affectors) {
      affector.delete()
    }
    for(const source of VeryParticularEngine.sources) {
      source.delete()
    }
  }
}