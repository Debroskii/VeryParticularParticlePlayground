class Panel {
    constructor(position, width, height, title = "", registry = new Registry(""), fixed = false, closeable = true) {
        this.position = position
        this.offset = createVector(0, 0)
        this.width = width
        this.height = min(height, 550)
        this.title = title
        this.registry_id = registry.id
        
        this.dragging = false
        this.fixed = fixed
        this.closeable = closeable

        this.panel_div = createDiv("")
        this.panel_div.addClass("Panel")

        this.panel_div.style("position", "absolute")
        this.panel_div.style("top", position.y + "px").style("left", position.x + "px")
        this.panel_div.style("width", this.width + "px").style("height", this.height + "px")

        this.panel_div.child(this.create_title_bar())
    }

    // Binds a registry to show content on this panel
    bind(registry) {
        this.registry_id = registry.id
    }

    create() {
        if(this.registry_id == "") return this.panel_div
        let registry_div = createDiv("").addClass("PanelRegistry")
        for(let entry of GlobalRegistry.getRegistry(this.registry_id).entries) {
            let entry_div = createDiv("").addClass("PanelRegistryEntry")
            let entry_label = createP(entry.label).addClass("PanelRegistryEntryLabel")
            let entry_input

            if(entry.editable) {
                if(entry.type == Registry.EntryType.NUMBER) {
                    entry_input = createInput(entry.value).id(this.registry_id + "-" + entry.key)
                    entry_input.addClass("PanelRegistryEntryNumberInput").addClass("PanelRegistryEntryInput")
                    entry_input.attribute("type", "number")
                } else if (entry.type == Registry.EntryType.COLOR) {
                    entry_input = createColorPicker(entry.value).id(this.registry_id + "-" + entry.key)
                    entry_input.addClass("PanelRegistryEntryColorInput").addClass("PanelRegistryEntryInput")
                } else if (entry.type == Registry.EntryType.BOOLEAN) {
                    entry_input = createInput("", entry.value).id(this.registry_id + "-" + entry.key)
                    entry_input.addClass("PanelRegistryEntryCheckboxInput").addClass("PanelRegistryEntryInput")
                    entry_input.attribute("type", "checkbox")
                }
            } else {
                entry_input = createP(entry.value).addClass("PanelRegistryEntryConstant")
            }

            entry_div.child(entry_label)
            entry_div.child(entry_input)
            registry_div.child(entry_div)
        }

        this.panel_div.child(registry_div)
        return this.panel_div
    }

    update() {
        if(this.dragging && !this.fixed) {
            if(mouseX + this.offset.x > 0 && mouseX + this.offset.x < DIMENSIONS[0] - this.width) {
                this.position.x = mouseX + this.offset.x
            }

            if(mouseY + this.offset.y > 0 && mouseY + this.offset.y < DIMENSIONS[1] - this.height) {
                this.position.y = mouseY + this.offset.y
            }
            this.panel_div.style("top", this.position.y + "px").style("left", this.position.x + "px")
        }

        if(this.within_dragpad() && !this.fixed) {
            this.panel_div.style("box-shadow", "inset 0 0 0 2.5px var(--ui-accent)")
        } else {
            this.panel_div.style("box-shadow", "none")
        }

        GlobalRegistry.getRegistry(this.registry_id).sync()
    }

    pressed() {
        if(this.within_dragpad()) {
            this.dragging = true
            this.offset.set(this.position.x - mouseX, this.position.y - mouseY)
            this.panel_div.attribute("data-focused", true)
        }
    }

    released() {
        this.dragging = false
        this.panel_div.attribute("data-focused", false)
    }

    within_dragpad() {
        return (mouseX > this.position.x && mouseY > this.position.y && mouseX < this.position.x + this.width && mouseY < this.position.y + 20)
    }

    static default() {
        return new Panel(createVector(30, 128), 150, 150, "Default Panel")
    }

    static default_at(position) {
        return new Panel(position, 150, 150, "Default Panel")
    }

    create_title_bar() {
        let bar = createDiv("")
        bar.addClass("PanelTitleBar")
        
        if(this.closeable) {
            let close_button = IconButton.Close(20, () => {
                this.panel_div.remove(); 
                UI.panels.splice(UI.panels.indexOf(this), 1);
                if(this.registry_id == "config") UI.config_panel_open = false
            })
            bar.child(close_button.create())
        }

        let title = createP(this.title)
        title.addClass("PanelTitle").addClass("nohighlight-text")
        bar.child(title)

        if(this.fixed) {
            let lock_icon = createImg("assets/icon/lock.png").addClass("PanelLockedIcon")
            bar.child(lock_icon)
        }

        return bar
    }
}