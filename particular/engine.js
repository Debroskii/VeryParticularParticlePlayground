class VeryParticularEngine {
    static particles = []

    static update() {
        for (const particle of VeryParticularEngine.particles) {
            particle.applyForce(Config.getGravityVector())
            particle.update()
        }
    }

    static draw() {
        for (const particle of VeryParticularEngine.particles) {
            particle.draw()
        }
    }
}