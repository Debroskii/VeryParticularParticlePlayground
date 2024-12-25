class VeryParticularEngine {
    static sources = []

    static tick() {
        for (const source of VeryParticularEngine.sources) {
            source.spawn()
            source.update()
            source.draw()
        }
    }
}