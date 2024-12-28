class Registry {
    // Different types of entry values
    // Needed to correctly retrieve the value of a DOM input
    static EntryType = Object.freeze({
        NUMBER: 0,
        BOOLEAN: 1,
        COLOR: 2
    })

    constructor(id) {
        this.id = id
        this.entries = []
    }

    // Adds a number entry to the registry
    addNumber(key, value, label = key, editable = true) {
        let entry = {
            key: key,
            value: value,
            label: label,
            editable: editable,
            type: Registry.EntryType.NUMBER
        }
        this.entries.push(entry)
        return this
    }

    // Adds a boolean entry to the registry
    addBoolean(key, value, label = key, editable = true) {
        let entry = {
            key: key,
            value: value,
            label: label,
            editable: editable,
            type: Registry.EntryType.BOOLEAN
        }
        this.entries.push(entry)
        return this
    }

    // Adds a color entry to the registry
    addColor(key, value, label = key, editable = true) {
        let entry = {
            key: key,
            value: value,
            label: label,
            editable: editable,
            type: Registry.EntryType.COLOR
        }
        this.entries.push(entry)
        return this
    }

    // Looks up the value of an entry in the registry
    get(key) {
        for(let entry of this.entries) {
            if(entry.key == key) {
                return entry.value
            }
        }
    }

    // Syncs all of the registry values to the values of their HTML input object
    sync() {
        // Iterates through all of the entries
        for(let entry of this.entries) {
            // Only sync/lookup the values of the entry if it is flagged as editable
            if(entry.editable) {
                if(entry.type == Registry.EntryType.NUMBER) {
                    entry.value = document.getElementById(this.id + "-" + entry.key).value
                } else if(entry.type == Registry.EntryType.BOOLEAN) {
                    entry.value = document.getElementById(this.id + "-" + entry.key).checked
                } else if(entry.type == Registry.EntryType.COLOR) {
                    entry.value = color(document.getElementById(this.id + "-" + entry.key).value)
                }
            }
        } 
    }
}

class GlobalRegistry {
    static registries = [new Registry("Bippity Boppity Boo!")]

    // Adds a registry to the global registry
    static addRegistry(registry) {
        this.registries.push(registry)
        return this
    }

    // Looks up a registry within the global registry
    static getRegistry(id) {
        for(let registry of GlobalRegistry.registries) {
            if(registry.id == id) {
                return registry
            }
        }
        return new Registry("")
    }
}