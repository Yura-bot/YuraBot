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

    musicEvents() {
        let count = 0;
        const files = readdirSync(join(__dirname, "../events-music"));
        files.forEach((e) => {
            try {
                count++;
                const eventName = e.split('.')[0];
                const file = require(join(__dirname, "../events-music", e));
                this.client.player.on(eventName, file.bind(null, this.client));
                delete require.cache[require.resolve(join(__dirname, "../events-music", e))];
            } catch (error) {
                throw new Error(`${'[Events Music]'} Impossible de charger l'évenement de musique ${e}: ${error.stack || error}.`)
            }
        });
        console.log(`${'[Events Music]'} Chargé(s): ${count}/${files.length} évenement(s).`)
    }

    giveawayEvents() {
        console.log(`${'[Events Giveaways]'} Chargé(s): 1 évenement(s).`)
        this.client.giveawaysManager.on('giveawayReactionAdded', (giveaway, member, reaction) => {

            if (giveaway.manager.client.id === member) return

            let rolesRequire = giveaway.extraData.roles;
            let memberRoles = member.roles.cache
            memberRoles = memberRoles.map(x => x.id);

            if (rolesRequire[0]) {
                let memberAuthorised = false

                rolesRequire.forEach(element => {
                    let result = memberRoles.find(el => el === element)
                    if (result) memberAuthorised = true
                });
    
                if (!memberAuthorised) {
                    reaction.users.remove(member).then();
                }
            }
       
        });
    }
}