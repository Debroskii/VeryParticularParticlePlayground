const FRAME_RATE = 60

function setup() {
  frameRate(FRAME_RATE)
  createCanvas(windowWidth, windowHeight);

  KeybindRegistry.addEntry([17, 65], () => { Engine.addAffector(new Affector(createVector(mouseX, mouseY))) })

  Config.init()
  UI.initialize()
}

function draw() {
  background(0)
  drawGrid()
  
  UI.updatePanels()
  Engine.loop()
}

function mousePressed() {
  UI.handleMousePress()
  Engine.handleMousePress()
}

function mouseReleased() {
  UI.handleMouseRelease()
  Engine.handleMouseRelease()
}

function keyPressed() {
  KeybindRegistry.pressed()
}

function drawGrid() {
  let rows = ceil(windowHeight / 40)
  let cols = ceil(windowWidth / 40)

  for(var col = 0; col < cols; col++) {
    let col_x = col * (windowWidth / cols)
    stroke(255, 7)
    if(col % 2 == 0) {
      stroke(255, 12.5)
    } else if(col % 4 == 0) {
      stroke(255, 20)
    }    strokeWeight(2)
    line(col_x, 0, col_x, windowHeight)
  }

  for(var row = 0; row < rows; row++) {
    let row_y = row * (windowHeight / rows)
    stroke(255, 7)
    if(row % 2 == 0) {
      stroke(255, 12.5)
    } else if(row % 4 == 0) {
      stroke(255, 20)
    }
    strokeWeight(2)
    line(0, row_y, windowWidth, row_y)
  }
}