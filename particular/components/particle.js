class Particle {
    constructor(position, velocity, mass, color) {
        this.lifetime = 0
        this.position = position
        this.velocity = velocity
        this.mass = mass
        this.color = color
    }

    applyForce(force) {
        let accelX = (this.mass / force.x)
        if(accelX == Infinity) accelX = 0

        let accelY = (this.mass / force.y)
        if(accelY == Infinity) accelY = 0

        this.velocity.add(createVector(accelX, accelY))
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