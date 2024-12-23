class Particle {
    constructor(position, velocity, mass, color) {
        this.lifetime = 0
        this.position = position
        this.velocity = velocity
        this.mass = mass
        this.color = color
    }

    applyForce(force) {
        let acceleration = createVector(
            force.x / this.mass,
            force.y / this.mass
        )

        this.velocity.add(acceleration)
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