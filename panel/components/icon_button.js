class IconButton {
    constructor(icon_filepath, on_click, width, height = width, title = "Button") {
        this.icon_filepath = icon_filepath
        this.on_click = on_click
        this.width = width
        this.height = height
        this.title = title
        this.button = createButton("")
        this.button.addClass("PanelButton")
        this.button.style("width", this.width + "px")
        this.button.style("height", this.height + "px")
        this.button.attribute("title", this.title)
        this.button.attribute("tabindex", -1)

        this.icon = createImg(this.icon_filepath)
        this.icon.addClass("PanelButtonIcon").addClass("PanelIcon")
        this.icon.style("width", this.width * 0.75 + "px")
        this.icon.style("height", this.height * 0.75 + "px")
        this.button.child(this.icon)

        this.button.mouseClicked(this.on_click)
    }

    create() {
        return this.button
    }

    static Close(width, on_click) {
        let button = new IconButton("assets/icon/x.png", on_click, width, width, "Close")
        button.button.addClass("CloseButton")
        return button
    }
}