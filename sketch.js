let DIMENSIONS
const FRAME_RATE = 60

function setup() {
  DIMENSIONS = [windowWidth, windowHeight]
  document.addEventListener('contextmenu', event => event.preventDefault())
  frameRate(FRAME_RATE)
  createCanvas(DIMENSIONS[0], DIMENSIONS[1]);
  Config.init()
  UI.initialize()
  createImg("assets/input/shift_key.svg").addClass("InputImg").style("top", DIMENSIONS[1] - 70.5 + "px").style("left", "50px")
  createImg("assets/input/shift_key.svg").addClass("InputImg").style("top", DIMENSIONS[1] - 100.5 + "px").style("left", "50px")
  createImg("assets/input/space_key.svg").addClass("InputImg").style("top", DIMENSIONS[1] - 40.5 + "px").style("left", "44px")
  createImg("assets/input/mouse_left.svg").addClass("InputImgMouse").style("top", DIMENSIONS[1] - 95.5 + "px").style("left", "95px")
  createImg("assets/input/mouse_right.svg").addClass("InputImgMouse").style("top", DIMENSIONS[1] - 65 + "px").style("left", "95px")
  createImg("assets/input/mouse_right.svg").addClass("InputImgMouse").style("top", DIMENSIONS[1] - 35.5 + "px").style("left", "90px")
}

function draw() {
  background(0)
  drawGrid(17, 10)
  noStroke()
  UI.updatePanels()
  VeryParticularEngine.tick()

  noStroke()
  fill(255, 55)
  textFont("monospace")
  textSize(10)
  text("Press       +     to place an Emitter", 15, DIMENSIONS[1] - 80)
  text("Press       +     to place an Affector", 15, DIMENSIONS[1] - 50)
  text("Hold       +     to launch Particles", 15, DIMENSIONS[1] - 20)
}

function mousePressed() {
  UI.handleMousePress()

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
  UI.handleMouseRelease()

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
  KeybindRegistry.pressed()
}

function drawGrid() {
  let rows = ceil(windowHeight / 40)
  let cols = ceil(windowWidth / 40)

  for(var col = 0; col < cols; col++) {
    let col_x = col * (DIMENSIONS[0] / cols)
    stroke(255, 7)
    if(col % 2 == 0) {
      stroke(255, 12.5)
    } else if(col % 4 == 0) {
      stroke(255, 20)
    }    strokeWeight(2)
    line(col_x, 0, col_x, DIMENSIONS[1])
  }

  for(var row = 0; row < rows; row++) {
    let row_y = row * (DIMENSIONS[1] / rows)
    stroke(255, 7)
    if(row % 2 == 0) {
      stroke(255, 12.5)
    } else if(row % 4 == 0) {
      stroke(255, 20)
    }
    strokeWeight(2)
    line(0, row_y, DIMENSIONS[0], row_y)
  }
}