class EmitterAttributes {
    constructor(count, force, color, mass_range = [1, 1], angles = [PI, -PI], color_effects = null, size_effects = null, force_variation = 0) {
        this.count = count
        this.force = force
        this.color = color
        this.mass_range = mass_range
        this.angles = angles
        this.color_effects = color_effects
        this.size_effects = size_effects
        this.force_variation = force_variation
    }
}