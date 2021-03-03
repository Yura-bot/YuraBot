const { ShardingManager } = require('discord.js');
const config = require("./configs/config.json");

const chalk = require('chalk');
const log = console.log;

const manager = new ShardingManager('./main.js', { 
    token: config.token,
    autoSpawn: true,
    respawn: true,
    totalShards: 1
});

manager.on('shardCreate', shard => {
    log(chalk.blue.bgBlue.bold(`• Lancement de la shard : ${shard.id}`));
    shard.on('reconnecting', (id) => { log(chalk.blue.bgBlue.bold(`• Relancement de la shard : ${id}`)) })
})

manager.spawn().then(() => {
    log(chalk.magenta(`[ShardManager] ${manager.totalShards} shards chargés !`));
    log(chalk.green("• Lancement du robot réussi, connecté !"));
})
