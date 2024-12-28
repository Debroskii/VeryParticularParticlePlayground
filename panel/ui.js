class UI {
    static InteractionType = Object.freeze({
        MOVE: "MOVE",
        EDIT: "EDIT",
        EMITTER: "EMITTER",
        AFFECTOR: "AFFECTOR"
    })

    static icon_bar = new IconBar()
    static panels = []
    static config_panel_open = false
    static mouseType = UI.InteractionType.MOVE

    static add_panel(panel) {
        UI.panels.push(panel)
        document.getElementById('ui').append(panel.create())
    }

    static create() {
        let ui = createDiv("")
        ui.id('ui')
        ui.style("width", DIMENSIONS[0] + "px")
        ui.style("height", DIMENSIONS[1] + "px")

        UI.icon_bar.add(new IconButton("assets/icon/refresh.png", VeryParticularEngine.reset, 20, 20, "Restart"))
        UI.icon_bar.add(new IconButton("assets/icon/config.png", UI.find_and_toggle_config, 20, 20, "Config"))
        ui.child(UI.icon_bar.create())

        for(const panel of UI.panels) {
            ui.child(panel.create())
        }
    }

    static update() {
        let ui = document.getElementById("ui")
        let children = ui.children

        for(let i = 1; i < children.length; i++) {
            if(children[i].getAttribute("data-focused") == "true" && i < children.length) {
                ui.appendChild(children[i])
            }
        }

        for(const panel of UI.panels) {
            panel.update()
        }
    }

    static find_and_toggle_config() {
        if(!UI.config_panel_open) {
            UI.add_panel(
                new Panel(
                    createVector(DIMENSIONS[0] - 225, (DIMENSIONS[1] / 2) - 300), 200, 600, "Env. Config", Config.registry, true, false
                )
            )
            UI.config_panel_open = true
            return
        }
        for(const panel of UI.panels) {
            if(panel.registry_id == "config") {
                panel.panel_div.remove();  
                UI.panels.splice(UI.panels.indexOf(panel), 1);
                UI.config_panel_open = false
                break;
            }
        }
    }
}