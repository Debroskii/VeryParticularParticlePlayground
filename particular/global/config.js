class Config {

    // Gravity strength and direction for the engine
    static GRAVITY_MAGNITUDE = 0.0
    static GRAVITY_ANGLE = 0

    // Returns a vector of gravity to directly apply to each particle
    static getGravityVector() {
        return createVector(this.GRAVITY_MAGNITUDE * sin(this.GRAVITY_ANGLE), this.GRAVITY_MAGNITUDE * cos(this.GRAVITY_ANGLE))
    }

    // How long the particle should be alive and ticking
    static PARTICLE_TIMEOUT = 300
}