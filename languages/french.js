[1mdiff --git a/commands/Giveaway/start-giveaway.js b/commands/Giveaway/start-giveaway.js[m
[1mindex 60dac78..3456b60 100644[m
[1m--- a/commands/Giveaway/start-giveaway.js[m
[1m+++ b/commands/Giveaway/start-giveaway.js[m
[36m@@ -7,7 +7,7 @@[m [mclass CreateGiveaway extends Command {[m
             aliases: ['sta-give', 's-g'],[m
             category: 'giveaway',[m
             description: 'Permet de crée et de lancer un giveaway.',[m
[31m-            usage: 'start-giveaway [Channel] [Temps] [Nombre de gagnants] [Prix] '[m
[32m+[m[32m            usage: 'start-giveaway [Channel] [Temps] [Nombre de gagnants] [Prix] (condition [Role])'[m[41m[m
         });[m
     }[m
 [m
[36m@@ -59,12 +59,25 @@[m [mclass CreateGiveaway extends Command {[m
             return message.channel.send(language("SYNTAXE") + prefix + language("SYNTAXE_GIVEAWAY_START"));[m
         }[m
 [m
[32m+[m[32m        let condition = false[m[41m[m
[32m+[m[41m[m
[32m+[m[32m        let roleCondition = message.mentions.roles.first()[m[41m[m
[32m+[m[32m        if (roleCondition) {[m[41m[m
[32m+[m[32m            condition = true[m[41m[m
[32m+[m[32m            roleCondition = message.mentions.roles.first().id[m[41m[m
[32m+[m[32m        } else {[m[41m[m
[32m+[m[32m            condition = false[m[41m[m
[32m+[m[32m        }[m[41m[m
[32m+[m[41m[m
         // Start the giveaway[m
        client.giveawaysManager.start(giveawayChannel, {[m
          time: ms(giveawayDuration),[m
          prize: giveawayPrize,[m
          winnerCount: giveawayNumberWinners,[m
          hostedBy: true ? message.author : null,[m
[32m+[m[32m         condition: {[m[41m[m
[32m+[m[32m            role: roleCondition,[m[41m[m
[32m+[m[32m        },[m[41m[m
          messages: {[m
              giveaway: language("GIVEAWAY_START_TITLE"),[m
              giveawayEnded: language("GIVEAWAY_START_ENDED"),[m
[1mdiff --git a/configs/config.json b/configs/config.json[m
[1mindex 2577e6e..696fa4c 100644[m
[1m--- a/configs/config.json[m
[1m+++ b/configs/config.json[m
[36m@@ -1,16 +1,16 @@[m
 {[m
     "BOTNAME": "Yura",[m
[31m-    "token": "NjYyNzc1ODkwMTk0OTg5MDY2.Xg-4Jg.9eLc4R1nnknuuQAyAzRZEfsKz4Y",[m
[31m-    "secret": "RV_eafH16_wfQmbRmVpGSsm07_vamjw_",[m
[32m+[m[32m    "token": "NTk1NTg4MzQyMzE4MzY2NzM0.XRtK3g.ibLziFAD8LwTNL-2EYZKcmOsbDU",[m
[32m+[m[32m    "secret": "7riZtuPB3RD8I8GzsfuV4KhtsOJXAUfF",[m
     "owner": "477582590329749504",[m
     [m
     "ameToken": "65af5d54e943b52df5558f14b288e3338bf40f64dc5207c878c99c56b855ae62bb1598ebbd314f1bd5cf57c04259bad221ae875aa8105bee4882c63417b1699f",[m
     "jokeToken": "9G_ZEj.NbTPQZDtcy9oDbWkiw0kb5PKBnUA_lRa_WLM1JVHydepb7Y2Yz8zuV0HI",[m
     "dblApi": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Mjc3NTg5MDE5NDk4OTA2NiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTg4ODY2NDIwfQ.dejA1-dSCKAxsOZWyWEc51c84ho2WjFuJ1GCwpBR70E",[m
 [m
[31m-    "panel_url": "https://dash.yurabot.xyz",[m
[31m-    "password": "RV_eafH16_wfQmbRmVpGSsm07_vamjw_",[m
[31m-    "port": "81",[m
[32m+[m[32m    "panel_url": "http://45.140.165.51:3000",[m
[32m+[m[32m    "password": "7riZtuPB3RD8I8GzsfuV4KhtsOJXAUfF",[m
[32m+[m[32m    "port": "3000",[m
 [m
     "prefix": "?",[m
     "url": "https://yurabot.xyz",[m
[1mdiff --git a/languages/french.js b/languages/french.js[m
[1mindex e049f5f..ad909a8 100644[m
[1m--- a/languages/french.js[m
[1m+++ b/languages/french.js[m
[36m@@ -3,7 +3,7 @@[m [mconst languageData = {[m
     PING_BEFORE: " Calcul en cours...",[m
     PING_AFTER: " **»** Latence du bot : `",[m
     PING: (ms) => `Pong! Latence du bot: ${ms}ms`,[m
[31m-    LANGUAGE: "Anglais | EN | English",[m
[32m+[m[32m    LANGUAGE: "Français | FR | French",[m[41m[m
     ERRROR_BOT: "<:X_:673212163837526064> **Erreur :**",[m
     SYNTAXE: "<:X_:673212163837526064> Votre syntaxe est incorrecte. \n```Syntaxe : ",[m
     X_EMOJI: "<:X_:673212163837526064> ",[m
[1mdiff --git a/main.js b/main.js[m
[1mindex 3272fe2..5351cfa 100644[m
[1m--- a/main.js[m
[1m+++ b/main.js[m
[36m@@ -55,7 +55,7 @@[m [mclass Class extends Client {[m
         this.ameApi = new ameClient(Config.ameToken)[m
         this.joke = new Joke(Config.jokeToken, { defaultLang: "fr" });[m
 [m
[31m-        this.dbl = new DBL(Config.dblApi, this);[m
[32m+[m[32m        //this.dbl = new DBL(Config.dblApi, this);[m
 [m
         this.dash = require("./dashboard/dashboard.js");[m
 [m
