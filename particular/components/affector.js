class Affector {
    constructor(position, force) {
        this.position = position
        this.id = "A" + round(random(0, 10000))
        this.dragging = false
        this.offset = createVector(0, 0)

        this.registry = new Registry(this.id)
        this.registry.registerNumber("id", this.id, "ID", false)
        this.registry.registerNumber("force", force, "Force", true)

        GlobalRegistry.addRegistry(this.registry)
    }

    update(particles) {
        if(this.dragging) {
            this.position.x = mouseX + this.offset.x
            this.position.y = mouseY + this.offset.y
            document.getElementById("ui").style.cursor = "move"
        }

        for(const particle of particles) {
            let dist = this.position.dist(particle.position)
            let particle_force = max(-2, min(Config.getGravitationalForce(this.registry.get("force"), particle.mass, dist), 2))
            let angle = this.position.copy().sub(particle.position).heading()
            let force_vec = createVector(-particle_force * cos(angle), -particle_force * sin(angle))

            particle.applyForce(force_vec)
        }
    }

    draw() {
        if(this.draggable()) {
            document.getElementById("UIRoot").style.cursor = "pointer"

            stroke(0, 205)
            strokeWeight(7)
            fill(255, 255)
            textFont("monospace")
            textSize(10)
            text(this.registry.get("force") < 0 ? "Attractor" : this.registry.get("force") > 0 ? "Repeller" : "Affector", mouseX + 13, mouseY)
        }

        if(this.registry.get("force") < 0) {
            stroke(255, 205)
        } else if(this.registry.get("force") > 0) {
            stroke(0, 205)
        } else {
            stroke(255, 0, 255, 205)
        }
        fill(this.registry.get("force") > 0 ? 255 : 0)
        strokeWeight(2)
            if(this.draggable()) {
                strokeWeight(3)
            }
        circle(this.position.x, this.position.y, 10)
    }

    edit() {
        if(this.draggable()) {
            UI.add_panel(
                new Panel(
                    createVector(mouseX, mouseY),
                    200,
                    75,
                    "Edit Affector",
                    this.registry
                )
            )
        }
    }

    delete() {
        if(this.draggable()) {
            VeryParticularEngine.affectors.splice(VeryParticularEngine.affectors.indexOf(this), 1)
        }
    }

    pressed() {
        if(this.draggable()) {
            this.dragging = true
            this.offset.set(this.position.x - mouseX, this.position.y - mouseY)
        }
    }

    released() {
        this.dragging = false
    }

    draggable() {
        return sqrt(((this.position.x - mouseX) ** 2) + ((this.position.y - mouseY) ** 2)) <= 5
    }
}