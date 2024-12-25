class Emitter {
    constructor(position, attributes) {
        this.particles = []
        this.position = position
        this.attributes = attributes
    }

    spawn() {
        for(var i = 0; i < this.attributes.count; i++) {
            let angle = random(this.attributes.angles[0], this.attributes.angles[1])
            let mass = random(this.attributes.mass_range[0], this.attributes.mass_range[1])
            let speed = ((this.attributes.force + random(-this.attributes.force_variation, this.attributes.force_variation)) / mass)
            if(speed == Infinity) speed = 1

            let velocity = createVector(speed * sin(angle), speed * cos(angle))

            this.particles.push(new Particle(this.position, velocity, mass, this.attributes.color))
        }
    }

    update() {
        for(const particle of this.particles) {
            particle.applyAcceleration(Config.getGravityVector())
            particle.update()

            if(Util.out_of_bounds(particle.position) || particle.lifetime >= Config.PARTICLE_TIMEOUT) {
                this.particles.splice(this.particles.indexOf(particle), 1)
            }
        }
    }

    draw() {
        for(const particle of this.particles) {
            particle.draw()
        }
    }
}