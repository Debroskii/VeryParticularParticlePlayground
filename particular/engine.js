class VeryParticularEngine {
    static sources = []
    static launch_sources = []
    static affectors = []

    static tick() {
        for(const source of VeryParticularEngine.sources) {
            source.spawn()
            source.update()
            source.draw()

            for(const affector of VeryParticularEngine.affectors) {
                affector.update(source.particles)
            }
        }

        for(const source of VeryParticularEngine.launch_sources) {
            source.update()
            source.draw()

            for(const affector of VeryParticularEngine.affectors) {
                affector.update(source.particles)
            }
        }

        for(const affector of VeryParticularEngine.affectors) {
            affector.draw()
        }
    }

    static reset() {
        if(!confirm("Are you sure you want to clear the engine?")) return
        VeryParticularEngine.sources = []
        VeryParticularEngine.affectors = []
    }
}