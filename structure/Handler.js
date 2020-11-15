const { readdirSync } = require('fs');
const { join } = require("path");

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    commands() {
        let count = 0;
        const folders = readdirSync(join(__dirname, "../commands"));

        for (let i = 0; i < folders.length; i++) {
            const commands = readdirSync(join(__dirname, "../commands", folders[i]));
            count = count + commands.length;
            for(const c of commands){
                try {
                    const command = require(join(__dirname, "../commands", folders[i], c));
                    this.client.commands.set(command.name, command);
                } catch (error) {
                    console.log(`${'[Commands]'} Impossible de charger la commande ${c}: ${error.stack || error}.`)
                }
            }
        }
        
        console.log(`${'[Commands]'} Chargée(s): ${this.client.commands.size}/${count} commande(s).`)
    }

    events() {
        let count = 0;
        const files = readdirSync(join(__dirname, "../events"));
        files.forEach((e) => {
            try {
                count++;
                const fileName = e.split('.')[0];
                const file = require(join(__dirname, "../events", e));
                this.client.on(fileName, file.bind(null, this.client));
                delete require.cache[require.resolve(join(__dirname, "../events", e))];
            } catch (error) {
                throw new Error(`${'[Events]'} Impossible de charger l'évenement ${e}: ${error.stack || error}.`)
            }
        });
        console.log(`${'[Events]'} Chargé(s): ${count}/${files.length} évenement(s).`)
    }
}