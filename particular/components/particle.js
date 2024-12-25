class Particle {
    constructor(position, velocity, mass, color) {
        this.lifetime = 0
        this.position = position.copy()
        this.velocity = velocity.copy()
        this.mass = mass
        this.color = color
    }

    applyAcceleration(acceleration) {
        this.velocity.add(acceleration)
    }

    applyForce(force) {
        let ax = (force.copy().x / this.mass)
        if(ax == Infinity) ax = 0

        let ay = (force.copy().y / this.mass)
        if(ay == Infinity) ay = 0

        this.velocity.add(createVector(ax, ay))
    }

    update() {
        this.lifetime++
        this.position.add(this.velocity)
    }

    draw() {
        noStroke()
        fill(this.color)
        ellipse(this.position.x, this.position.y, this.mass * 1.5, this.mass * 1.5)
    }
}