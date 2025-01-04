class Emitter {
    static EffectBasis = Object.freeze({
        LIFETIME: "Lifetime",
        DISTANCE: "Distance"
    })

    constructor(position) {
        this.particles = []
        this.id = "E" + round(random(0, 10000))
        this.position = position

        this.dragging = false
        this.offset = createVector(0, 0)

        this.registry = new Registry(this.id)
        this.registry.addNumber("id", this.id, "ID", false)

        // Physics
        this.registry.addNumber("pps", 1, "Particles Per Second", true)
        this.registry.addNumber("force", 0.5, "Force", true)
        this.registry.addNumber("force_variation", 0.0, "Force Variation", true)
        this.registry.addNumber("min_mass", 1, "Minimum Mass", true)
        this.registry.addNumber("max_mass", 3, "Maximum Mass", true)
        this.registry.addNumber("min_angle", -180, "Minimum Angle", true)
        this.registry.addNumber("max_angle", 180, "Maximum Angle", true)

        this.registry.addDivider("simple_styling", "Simple Styling")

        this.registry.addColor("color", color(255, 255, 255), "Color", true)
        this.registry.addBoolean("trail", false, "Particle Trail", true)
        this.registry.addBoolean("twinkle", false, "Twinkle", true)

        this.registry.addDivider("gradient_divider", "Gradient")

        this.registry.addBoolean("gradient_effect", false, "Color Gradient", true)
        this.registry.addDropdown(
            "gradient_basis", 
            Emitter.EffectBasis.LIFETIME, 
            [Emitter.EffectBasis.LIFETIME, Emitter.EffectBasis.DISTANCE],
            "Gradient Basis",
            true
        )
        this.registry.addColor("gradient_color_1", color(255, 255, 255), "1st Gradient Color", true)
        this.registry.addColor("gradient_color_2", color(255, 255, 255), "2nd Gradient Color", true)

        this.registry.addDivider("fade_divider", "Fading")
        this.registry.addBoolean("fade_out", false, "Fade Out", true)
        this.registry.addDropdown("fade_out_basis", Emitter.EffectBasis.LIFETIME, [Emitter.EffectBasis.LIFETIME, Emitter.EffectBasis.DISTANCE], "Fade Out Basis", true)

        this.registry.addDivider("scaling_divider", "Scaling Effects")
        this.registry.addBoolean("shrink", false, "Shrink", true)
        this.registry.addDropdown("shrink_basis", Emitter.EffectBasis.LIFETIME, [Emitter.EffectBasis.LIFETIME, Emitter.EffectBasis.DISTANCE], "Shrinking Basis", true)
        this.registry.addBoolean("fluctuate", false, "Fluctuate", true)

        GlobalRegistry.addRegistry(this.registry)
        
        let angle = random(this.registry.get("min_angle") * PI/180, this.registry.get("max_angle") * PI/180)
        let mass = random(this.registry.get("min_mass"), this.registry.get("max_mass"))
        let speed = (
            (this.registry.get("force") + random(-this.registry.get("force_variation"), this.registry.get("force_variation"))
        ) / mass)
        if(speed == Infinity) speed = 1

        let velocity = createVector(speed * sin(angle), speed * cos(angle))

        this.particles.push(new Particle(this.position, velocity, mass, this.registry.get("color"), this.registry.get("trail")))
    }

    spawn() {
        if(this.registry.get("pps") < 1) {
            if(round(frameCount / 60 % (1 / this.registry.get("pps"))) == 0) {
                let angle = random(this.registry.get("min_angle") * PI/180, this.registry.get("max_angle") * PI/180)
                let mass = random(this.registry.get("min_mass"), this.registry.get("max_mass"))
                let speed = (
                    (this.registry.get("force") + random(-this.registry.get("force_variation"), this.registry.get("force_variation"))
                ) / mass)
                if(speed == Infinity) speed = 1

                let velocity = createVector(speed * sin(angle), speed * cos(angle))

                this.particles.push(new Particle(this.position, velocity, mass, this.registry.get("color"), this.registry.get("trail")))
            }
        } else {
            for(var i = 0; i < this.registry.get("pps"); i++) {
                let angle = random(this.registry.get("min_angle") * PI/180, this.registry.get("max_angle") * PI/180)
                let mass = random(this.registry.get("min_mass"), this.registry.get("max_mass"))
                let speed = (
                    (this.registry.get("force") + random(-this.registry.get("force_variation"), this.registry.get("force_variation"))
                ) / mass)
                if(speed == Infinity) speed = 1

                let velocity = createVector(speed * sin(angle), speed * cos(angle))

                this.particles.push(new Particle(this.position, velocity, mass, this.registry.get("color"), this.registry.get("trail")))
            }
        }
    }

    update() {
        if(this.dragging) {
            this.position.x = mouseX + this.offset.x
            this.position.y = mouseY + this.offset.y
            document.getElementById("ui").style.cursor = "move"
        }

        for(const particle of this.particles) {
            particle.applyAcceleration(Config.getGravityVector())
            particle.update()

            if(Util.out_of_bounds(particle.position) || particle.lifetime >= Config.registry.get("particle_timeout")) {
                this.particles.splice(this.particles.indexOf(particle), 1)
            }
        }
    }

    draw() {
        console.log(this.registry.get("twinkle"))
        for(const particle of this.particles) {
            let info = {
                emitter_position: this.position,
                gradient: {
                    enabled: this.registry.get("gradient_effect"),
                    basis: this.registry.get("gradient_basis"),
                    color1: this.registry.get('gradient_color_1'),
                    color2: this.registry.get('gradient_color_2')
                },
                twinkle: this.registry.get("twinkle"),
                fade: {
                    enabled: this.registry.get("fade_out"),
                    basis: this.registry.get("fade_out_basis")
                },
                shrink: {
                    enabled: this.registry.get("shrink"),
                    basis: this.registry.get("shrink_basis")
                },
                fluctuate: this.registry.get("fluctuate")
            }
            particle.draw(info)
        }
        fill(this.registry.get("color"))
        stroke(0, 155)
        strokeWeight(2)
        if(this.draggable()) {
            strokeWeight(3)
        }
        circle(this.position.x, this.position.y, 10)

        if(this.draggable()) {
            document.getElementById("ui").style.cursor = "pointer"
            
            fill(255, 255)
            textFont("monospace")
            textSize(10)
            text("Emitter", mouseX + 13, mouseY - 7.5)
            fill(255, 155)
            textSize(8)
            text("Press E to Edit", mouseX + 13, mouseY + 5)
            text("Press X to Delete", mouseX + 13, mouseY + 8.5 * 2)
        }
    }

    edit() {
        if(this.draggable()) {
            UI.add_panel(
                new Panel(
                    createVector(mouseX, mouseY),
                    200,
                    300,
                    "Edit Emitter",
                    this.registry
                )
            )
        }
    }

    delete() {
        if(this.draggable()) {
            VeryParticularEngine.sources.splice(VeryParticularEngine.sources.indexOf(this), 1)
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

class LaunchEmitter {
    constructor(position) {
        this.particles = []
        this.id = "LE" + round(random(0, 10000))
        this.position = position
        this.angle = 0
        this.mag = 0
        this.count = 1
        this.launched = false

        this.dragging = true
    }

    launch() {
        if(this.launched) return
        for(var i = 0; i < this.count; i++) {
            let angle = this.angle + random(-i, i)
            let vel = createVector(this.mag * cos(angle), this.mag * sin(angle))
            this.particles.push(new Particle(this.position, vel, random(1, 3), color(255, 255, 255), Config.registry.get("launch_particle_trail"), true))
        }
        this.launched = true
    }

    update() {
        if(this.dragging) {
            this.angle = atan2(mouseY - this.position.y, mouseX - this.position.x)
            this.mag = sqrt(((mouseY - this.position.y) ** 2) + ((mouseX - this.position.x) ** 2)) * 0.1
            document.getElementById("ui").style.cursor = "pointer"
        } else {
            for(const particle of this.particles) {
                particle.applyAcceleration(Config.getGravityVector())
                particle.update()
    
                if(Util.out_of_bounds(particle.position) || particle.lifetime >= Config.registry.get("launch_particle_timeout")) {
                    this.particles.splice(this.particles.indexOf(particle), 1)
                }
            }
            if(this.particles.length == 0) {
                VeryParticularEngine.launch_sources.splice(VeryParticularEngine.launch_sources.indexOf(this), 1)
            }
        }
    }

    draw() {
        if(this.dragging) {
            fill(255)
            circle(this.position.x, this.position.y, 5)
            stroke(255)
            let vel = createVector(this.mag * cos(this.angle), this.mag * sin(this.angle))
            line(this.position.x, this.position.y, this.position.x + vel.x * 10, this.position.y + vel.y * 10)

            let left_vert = createVector(this.mag * 8.5 * cos(this.angle - 0.1), this.mag * 8.5 * sin(this.angle - 0.1))
            let right_vert = createVector(this.mag * 8.5 * cos(this.angle + 0.1), this.mag * 8.5 * sin(this.angle + 0.1))

            beginShape()
            vertex(this.position.x + vel.x * 10, this.position.y + vel.y * 10)
            vertex(this.position.x + left_vert.x, this.position.y + left_vert.y)
            vertex(this.position.x + right_vert.x, this.position.y + right_vert.y)
            endShape()

        } else {
            for(const particle of this.particles) {
                particle.draw()
            }
        }
    }

    pressed() {}
    spawn() {}

    released() {
        this.dragging = false
        this.launch()
        console.log("he")
    }
}