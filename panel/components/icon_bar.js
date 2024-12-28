class IconBar {
    constructor(children = []) {
        this.children = children
    }

    add(icon_button) {
        this.children.push(icon_button)
    }

    create() {
        let bar = createDiv("")
        bar.id("panelIconBar")

        let height = 0
        let width = 0
        for(const bar_child of this.children) {
            bar.child(bar_child.create())
            if(height < bar_child.height) height = bar_child.height
            width += bar_child.width
        }

        bar.style("height", height + "px")
        bar.style("width", width + "px")

        return bar
    }
}