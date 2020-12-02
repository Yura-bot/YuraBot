const languageData = {
    GENERATION: " Génération en cours...",
    PING_BEFORE: " **»** Latence: `.. ms`.",
    PING_AFTER: " **»** Latence: `",
    PING: (ms) => `Pong! Latence du bot: ${ms}ms`,
    LANGUAGE_UPDATED: "Langue du bot mise à jour",
    MISSING_LANGUAGE: "Vous devez préciser une langue valide! (english ou french)",
    HELLO: "Bonjour!",
    LANGUAGE_NO_EXIST: "Cette langue n'existe pas!",
    TEST: "Ceci est un test! ",
    XP: ", félicitations ! Vous avez atteint le niveau **.",
    LANGUAGE: "Français | FR | French",
    ERRROR_BOT: "<:X_:673212163837526064> **Erreur :**",
    SYNTAXE: "<:X_:673212163837526064> Votre syntaxe est incorrecte. \n```Syntaxe : ",
    X_EMOJI: "<:X_:673212163837526064> ",
    /* Permissions : */
    MISSING_PERMISSION_ADMINISTRATOR: "<:X_:673212163837526064> **Vous ne disposez pas les permissions nécessaires pour effectuer cette commande !** \n **Vous devez avoir la permission `ADMINISTRATOR` !**",
    MISSING_PERMISSION_MANAGE_GUILD: "<:X_:673212163837526064> **Vous ne disposez pas les permissions nécessaires pour effectuer cette commande !** \n **Vous devez avoir la permission `MANAGE_GUILD` !**",
    MISSING_PERMISSION_MANAGE_MESSAGES: "<:X_:673212163837526064> **Vous ne disposez pas les permissions nécessaires pour effectuer cette commande !** \n **Vous devez avoir la permission `MANAGE_MESSAGES` !**",
    MISSING_PERMISSION_MANAGE_ROLES: "<:X_:673212163837526064> **Vous ne disposez pas les permissions nécessaires pour effectuer cette commande !** \n **Vous devez avoir la permission `MANAGE_ROLES` !**",
    MISSING_PERMISSION_MUTE_MEMBERS: "<:X_:673212163837526064> **Vous ne disposez pas les permissions nécessaires pour effectuer cette commande !** \n **Vous devez avoir la permission `MUTE_MEMBERS` !**",
    MISSING_PERMISSION_KICK_MEMBERS: "<:X_:673212163837526064> **Vous ne disposez pas les permissions nécessaires pour effectuer cette commande !** \n **Vous devez avoir la permission `KICK_MEMBERS` !**",
    MISSING_PERMISSION_BAN_MEMBERS: "<:X_:673212163837526064> **Vous ne disposez pas les permissions nécessaires pour effectuer cette commande !** \n **Vous devez avoir la permission `BAN_MEMBERS` !**",
    /* Permissions Yura : */
    BOT_PERMISSION_MANAGE_ROLES: "<:X_:673212163837526064> **Erreur :** Je n'ai pas la permission `MANAGE_ROLES` !",
    BOT_PERMISSION_ADMINISTRATOR: "<:X_:673212163837526064> **Erreur :** Je n'ai pas la permission `ADMINISTRATOR` !",
    /* Commande Help : */
    HELP_TITLE: "__**Voici la liste des commandes :**__",
    HELP_ADMIN: "► Administration :computer:",
    HELP_MOD: "► Modérations :rotating_light:",
    HELP_GIVEAWAY: "► Giveaway 🎁",
    HELP_MUSIC: "► Musique 🎶",
    HELP_FUN: "► Fun :tada:",
    HELP_ECO: "► Économie 💸",
    HELP_UTIL: "► Utilitaire :gear:",
    HELP_NSFW: "► NSFW :underage:",
    HELP_BOT: "► Bot :robot:",
    /* ADMIN : */
    /* Commande Setprefix : */
    SETPREFIX: "setprefix",
    SETPREFIX_ERROR_1: "Veuillez indiquer le préfixe que vous souhaitez fixer !",
    SETPREFIX_ERROR_2: "Vous ne pouvez pas fixer le préfixe d'un double argument ",
    SETPREFIX_ERROR_3: "Vous ne pouvez pas envoyer de préfixe de plus de 3 caractères !",
    SETPREFIX_RESET: "Le Préfixe a été correctement réinitialisé ✅",
    SETPREFIX_SUCESS: "Le prefix est maintenant : ",
    /* Commande Backup : */
    BACKUP_CREATE: "create-backup",
    BACKUP_LOAD: "load-backup",
    LOADING: "**<a:loading:675233191870595082> Chargement...**",
    BACKUP_COMMAND: "<:check:673212026226737153> | La sauvegarde a été créée ! Pour la charger, tapez cette commande sur le serveur de votre choix : `",
    BACKUP_SAVE: "<:check:673212026226737153>  Création d'une sauvegarde réussie. L'ID de sauvegarde a été envoyé en dm !",
    BACKUP_IDVALIDE: "<:X_:673212163837526064>  | Vous devez spécifier une ID de sauvegarde valide !",
    BACKUP_LOAD_CONFIRM: ":warning: | Lorsque la sauvegarde est chargée, tous les canaux, rôles, etc. seront remplacés ! Tapez `-confirm` pour confirmer !",
    BACKUP_LOAD_CONFIRM_CANCEL: "<:X_:673212163837526064>  | Le temps est écoulé ! Chargement de sauvegarde annulé !",
    BACKUP_LOAD_SUCESS: "<:check:673212026226737153>  | Commencez à charger la sauvegarde !",
    BACKUP_ERROR: "<:X_:673212163837526064>  | Désolé, une erreur s'est produite... Veuillez vérifier que j'ai les autorisations d'administrateur !",
    BACKUP_NO_FOUND: "<:X_:673212163837526064> | Aucune sauvegarde trouvée pour `",
    /* Commande Annonce : */
    SYNTAXE_ANNONCE: "annonce [Description]```",
    ANNONCE: "annonce",
    ANNONCE_TITLE: "📌 __Annonce :__",
    /* Commande MP : */
    SYNTAXE_MP: "mp [Utilisateur] [Message]```",
    MP: "mp",
    MP_MENTION: "Merci de mentionner un utilisateur pour envoyer un message privé depuis le bot.",
    MP_RECU: "Vous avez reçu un message de",
    MP_SERVEUR: "depuis le serveur",
    MP_CONTENT: "Il/Elle veut vous dire :",
    MP_SEND: "Votre message privé a bien été envoyé à ",
    /* Commande Say : */
    SYNTAXE_SAY: "say [MESSAGE]```",
    SAY: "say",
    /* Commande Sondage : */
    SYNTAXE_SONDAGE: "sondage [QUESTION]```",
    SONDAGE: "sondage",
    SONDAGE_TITLE: "📊 __Sondage :__",
    SONDAGE_FIELD: "Répondez dès maintenant au sondage avec ✅ ou ❌ !",
    /* FUN : */
    /* 8ball : */
    SYNTAXE_8BALL: "8ball [Votre Question]````",
    BALL: "8ball",
    QUESTION: "__**:interrobang: Question :**__",
    REPONSE: "Réponse :",
    YES: "Oui !",
    NO: "Non !",
    PEUT_ETRE: "Peut-être !",
    PROB_YES: "Probablement que oui !",
    PROB_No: "Probablement que non !",
    /* Avatar : */
    MESSAGE_AVATAR: "Voici l’avatar de ",
    AVATAR: "avatar",
    /* Joke : */
    TITLE_JOKE: "**__🎭 Joke :__**",
    JOKE: "blague",
    /* Calin : */
    MENTION_USER_FALSE: "<:false:551460099600678944> Merci de mentionner un utilisateur pour effectuer cette action.",
    CALIN: "calin",
    CALIN_SUCESS: " viens de faire un calin à ",
    CALIN_IMG: "https://zupimages.net/up/19/10/8vk8.gif", //English : https://gph.is/28RZ9dt (hug)
    /* declareramitie : */
    DECLARERAMITIE_MESSAGE: " viens de déclarer son amitié pour ",
    DECLARERAMITIE: "declareramitie",
    /* declareramour : */
    DECLARERAMOUR_MESSAGE: " viens de déclarer son amour pour ",
    DECLARERAMOUR: "declareramitie",
    /* frapper : */
    FRAPPER_MESSAGE: " viens de frapper ",
    FRAPPER: "frapper",
    /* kiss : */
    KISS_MESSAGE: " viens de faire un bisous à ",
    KISS: "kiss",
    /* soigner : */
    SOIGNER_MESSAGE: " viens de soigner ",
    SOIGNER: "soigner",
    /* Lotterie : */
    LOTTERIE_WIN: " Toutes nos félicitations !",
    LOTTERIE_LOSE: " plus de chance la prochaine fois.",
    LOTTERIE: "lottery",
    /* Animaux : */
    CAT:"Chat",
    DOG:"Chien",
    FOX: "Renard",
    /* True or false : */
    SYNTAXE_TRUEORFALSE: "trueorfalse [Message]```",
    TRUEORFALSE: "trueorfalse",
    VRAIOUFAUX: "❓ VRAI OU FAUX :",
    TRUEORFALSE_ANSWER: "Répondez avec les réactions :white_check_mark: ou :x:!",
    /* Weather : */
    SYNTAXE_WEATHER: "weather [Ville/Pays/Régions]```",
    WEATHER: "weather",
    WEATHER_VALID_PLACE: "**S'il vous plaît, fournissez moi un emplacement valide.**",
    WEATHER_FOR: "Météo pour ",
    //Temps
    SUNNY: "Ensoleillé",
    CLEAR: "Clair",
    MOSTLY_CLEAR: "Globalement clair",
    PARTLY_CLEAR: "Partiellement clair",
    MOSTLY_SUNNY: "Globalement ensoleillé",
    CLOUDY: "Nuageux",
    MOSTLY_CLOUDY: "Globalement nuageux",
    PARTLY_CLOUDY: "Partiellement nuageux",
    PARTLY_SUNNY: "Partiellement ensoleillé",
    BLOWING_DUST: "De la poussière dans l'air",
    LIGHT_RAIN: "Pluie légère",
    HAZE: "Brumeux",
    SMOKE: "De la fumée dans l'air",
    FAIR: "Brumeux",
    SNOW: "Neige",
    HAIL: "Grêle",
    RAIN_SHOWERS: "Très pluvieux",
    RAIN: "Pluvieux",
    //Directions
    NORTHEAST: "Nord-Est",
    SOUTHEAST: "Sud-Est",
    SOUTHWEST: "Sud-Ouest",
    NORTHWEST: "Nord-Ouest",
    NORTH: "Nord",
    SOUTH: "Sud",
    EAST: "Est",
    WEST: "Ouest",
    NO_WIND: "Aucun vent",
    //Embed
    FUSEAU_HORAIRE: "Fuseau horaire :",
    TEMPERATURE: "Température :",
    RESSENTI: "Ressenti :",
    VITESSE_DU_VENT: "Vitesse du vent :",
    DIRECTON_DU_VENT: "Direction du vent :",
    HUMIDITE: "Humidité :",
    /* Giveaway : */
    /* Giveaway Start : */
    SYNTAXE_GIVEAWAY_START: "start-giveaway [Channel] [Temps] [Nombre de gagnants] [Prix] ```",
    GIVEAWAY_START: "start-giveaway",
    GIVEAWAY_GO: "Le Giveaway vient de commencer sur le salon ",
    GIVEAWAY_START_TITLE: "🎉🎉 **GIVEAWAY** 🎉🎉",
    GIVEAWAY_START_ENDED: "🎉🎉 **GIVEAWAY FINI** 🎉🎉",
    GIVEAWAY_START_TIME_REMAINING: "Temps restant : **{duration}**! ",
    GIVEAWAY_START_REACT: "Réagissez avec 🎉 pour participer !",
    GIVEAWAY_START_WIN_MESSAGE: "Félicitations, {winners} ! Vous avez gagner  **{prize}** !",
    GIVEAWAY_START_FOOTER: "Giveaways by Yura",
    GIVEAWAY_START_NO_WINER: "Concours annulé, aucune participation valable.",
    GIVEAWAY_START_WINER: "Gagnant(s)",
    GIVEAWAY_START_ENDED_AT: "Terminé à",
    GIVEAWAY_START_SECONDS: "secondes",
    GIVEAWAY_START_MINUTES: "minutes",
    GIVEAWAY_START_HOURS: "heures",
    GIVEAWAY_START_DAYS: "jours",
    /* Giveaway End : */
    GIVEAWAY_END: "end-giveaway",
    GIVEAWAY_END_ID_INVALIDE: "Vous devez spécifier un ID de message valide",
    GIVEAWAY_END_ERROR: "Impossible de trouver un Giveaway pour ",
    GIVEAWAY_END_SUCESS: "Le Giveaway se terminera dans moins de ",
    GIVEAWAY_END_ID_NO_TERMINER_1: "Giveaway avec message ID ",
    GIVEAWAY_END_ID_NO_TERMINER_2: " n'est pas terminée.",
    GIVEAWAY_END_NO_TERMINER: "Ce giveaway n'est pas terminé !",
    GIVEAWAY_END_ERROR_OCCURED: "An error occured...",
    /* Giveaway Reroll : */
    GIVEAWAY_REROLL: "reroll-giveaway",
    SYNTAXE_GIVEAWAY_REROLL: "reroll-giveaway [Message ID du Giveaway]```",
    GIVEAWAY_REROLL_NO_FOUND: "Le giveaway n’a pas été trouvé :( ",
    GIVEAWAY_REROLL_SUCESS: "Le Giveaway a été relancer !",
    GIVEAWAY_REROLL_NO_END_1: "Le Giveaway avec le message ID ",
    GIVEAWAY_REROLL_NO_END_2: " n'est pas terminer.",
    GIVEAWAY_REROLL_NO_END: "Ce giveaway n’est pas fini !",
    GIVEAWAY_REROLL_ERROR_OCCURED: "An error occured...",
    /* NSFW : */
    NSFW_NO_CHANNEL_NSFW: "**:warning: | Ce n’est pas un salon NSFW ! | :warning:**",
    NSFW_LOADING: "Veuillez patienter... <a:loading:675233191870595082>",
    NSFW_IMG_NO_CHARGING: ":underage:\n**[L'image ne se charge pas ? cliquez ici]",
    /* Musique : */
    SONGS: "musiques",
    MUSIC_CHANNEL_VOCAL: "<:X_:673212163837526064> | Vous devez être dans un canal vocal !",
    MUSIC_NOTHING_PLAYING: "<:X_:673212163837526064> | Il n'y a rien à jouer !",
    MUSIC_DISCONECTED: "<:X_:673212163837526064> | La musique s'est arrêtée car j'ai été déconnecté du salon vocal !",
    MUSIC_CHANNEL_EMPTY: "<:X_:673212163837526064> | La musique s'est arrêtée car il n'y a plus de membre dans le salon vocal !",
    MUSIC_NO_RESULTS: (query) => `<:X_:673212163837526064> | Aucun résultat trouvé sur YouTube pour ${query} !`,
    MUSIC_SEARCH_CANCEL: "<:X_:673212163837526064> | Vous n'avez pas fourni de réponse valable ... Veuillez envoyer la commande à nouveau !",
    MUSIC_SEARCH_INVALIDE_RESPONSE: (track) => `<:X_:673212163837526064> | Vous devez envoyer un numéro valide entre **1** et **${track}** !`,
    MUSIC_TRACK_ADD: (title) => `<:check:673212026226737153> | ${title} ajouté à la file d'attente !`,
    /* Play : */
    PLAY_NO_REQUEST: "<:X_:673212163837526064> | Veuillez entrer une requête pour jouer la musique !",
    PLAY_ALREADYPLAYMUSIC: "<:X_:673212163837526064> | Je suis en train de jouer de la musique sur ce serveur dans un autre salon vocal, alors rejoignez le canal vocal dans lequel je suis pour commander le bot.",
    PLAY_ADD_QUEUE_1: "<:check:673212026226737153> | ",
    PLAY_ADD_QUEUE_2: " Ajouté à la file d'attente !",
    PLAY_PLAY: "🎶 | Lecture en cours :\n",
    PLAY_QUEUE_END: "⚠️ | File d'attente terminée, ajoutez d'autres chansons à jouer !",
    PLAY_REPEAT: "🔁 | Répétition :\n ",
    PLAY_PLAYNOW: "🎶 | Joue maintenant :\n ",
    PLAY_INTO: " dans ",
    PLAY_SEARCH_RESULTS: (results) => `Voici les résultats de votre recherche pour ${results} :`,
    /* Errors : */
    MUSIC_ERROR_1: "<:X_:673212163837526064> | Aucune musique n'est diffusée sur ce serveur !",
    MUSIC_ERROR_2: "<:X_:673212163837526064> | Vous n'êtes connecté à aucun canal vocal !",
    MUSIC_ERROR_3: "<:X_:673212163837526064> | Je ne peux pas me joindre à votre canal vocal, veuillez vérifier mes autorisations !",
    MUSIC_ERROR_4: (error) => `<:X_:673212163837526064> | Quelque chose a mal tourné ... Erreur : ${error}`,
    /* Clear Queue : */
    CLEAR_QUEUE_CLEAR: "<:check:673212026226737153> | La file d'attente est dégagée !",
    /* Loop : */
    LOOP_ACTIVATE: "<:check:673212026226737153> | Mode de répétition désactivé !",
    LOOP_DESACTIVATE: "🔁 | Mode de répétition activé !",
    /* Now Playing : */
    NOW_PLAYING_NOW_PLAYING: "🎶 | Jouer maintenant :\n",
    NOW_PLAYING_CHANNEL: "Chaine :\n",
    NOW_REQUESTBY: "Demandé par :",
    NOW_FORMPLAYLIST: "Vient d'une playlist ? :\n",
    NOW_PROGRESSBAR: "Barre de progression :",
    /* Pause : */
    PAUSE_PAUSE: "⏸ | En pause !",
    /* Resume : */
    RESUME_RESUME: "⏯️ | Reprise !",
    /* Skip : */
    SKIP_SKIP: "<:check:673212026226737153> | La musique actuelle vient d'être **sautée**.",
    /* Stop : */
    STOP_STOP: "⏹ | Déconnecté !",
    /* Queue : */
    QUEUE_QUEUE_IN_PROGRESS: "En cours",
    QUEUE_SHUFFLE: (shu) => `<:check:673212026226737153> | Queue mélangée **${shu}** musique(s)`,
    QUEUE_REQUESTBY: "demandé par",
    QUEUE_NOQUEUE: "<:X_:673212163837526064> | Aucune musique dans la queue.",
    /* Set Volume : */
    SET_VOLUME_NUMBER: "<:X_:673212163837526064> | Veuillez entrer un numéro !",
    SET_VOLUME_NUMBER_VALIDE: "<:X_:673212163837526064> | Veuillez entrer un numéro valide (entre 1 et 100) !",
    SET_VOLUME_SUCESS: (vol) => `<:check:673212026226737153> | Volume réglé sur **${vol}%** !`,
    /* Filtre : */
    FILTER_NO: "<:X_:673212163837526064> | Veuillez spécifier un filtre valide à activer ou désactiver !",
    FILTER_NOT_EXIST: "<:X_:673212163837526064> | Ce filtre n'existe pas !",
    FILTER_ADDED: "<:check:673212026226737153> | J'ajoute le filtre à la musique, attendez s'il vous plaît... \n Note : plus la musique est longue, plus cela prendra de temps !",
    FILTER_REMOVE: "<:check:673212026226737153> | Je **désactive** le filtre sur la musique, veuillez patienter... \n Note : plus la musique est longue, plus cela prendra de temps !",
    FILTER_LIST: (pre) => `Liste de tous les filtres activés ou désactivés.\nUtilisez \`${pre}filter\` pour ajouter un filtre à une chanson.`,
    /* Modération : */
    MOD_ACTION: "Action :",
    MOD_MEMBER: "Membre :",
    MOD_MODERATOR: "Modérateur :",
    MOD_REASON: "Raison :",
    MOD_TIME: "Temps :",
    /* Addroles : */
    SYNTAXE_ADDROLE: "<:X_:673212163837526064> Veuillez mentionner un utilisateur à qui donner le rôle. Exemple : `addrole [@user] [Members]`",
    ADDROLE: "addrole",
    UTILISATEUR_PAS_VALABLE: "<:X_:673212163837526064> **Erreur :** Cet utilisateur ne semble pas valable.",
    ADDROLE_ROLE_INVALABLE_1: "<:X_:673212163837526064> **Erreur :** ",
    ADDROLE_ROLE_INVALABLE_2: " n'est pas un rôle sur ce serveur ! \n `Veuillez verifier que vous ne l'avez pas mentioner !`",
    ADDROLE_ERROR_1: "<:X_:673212163837526064>> **Erreur :** Je n'ai pas réussi à ajouter le rôle à l'utilisateur parce que votre rôle est inférieur au rôle spécifié.",
    ADDROLE_ERROR_2: "<:X_:673212163837526064> **Erreur :** Je n'ai pas pu ajouter le rôle à l'utilisateur parce que mon rôle le plus élevé est inférieur au rôle spécifié.",
    ADDROLE_ERREUR: "<:X_:673212163837526064> **Erreur :**\n",
    ADDROLE_SUCESS_1: "<:check:673212026226737153> **",
    ADDROLE_SUCESS_2: "**, J'ai ajouté le **",
    ADDROLE_SUCESS_3: "** rôle à **",
    /* DelRoles : */
    SYNTAXE_DELROLES: "<:X_:673212163837526064> Veuillez mentionner un utilisateur à qui supprimer le rôle. Exemple : `delrole [@user] [Members]`",
    DELROLES: "delroles",
    DELROLES_ROLE_INVALABLE_1: "<:X_:673212163837526064> **Erreur :** ",
    DELROLES_ROLE_INVALABLE_2: " n'est pas un rôle sur ce serveur ! \n `Veuillez verifier que vous ne l'avez pas mentioner !`",
    DELROLES_ERROR_1: "<:X_:673212163837526064>> **Erreur :** Je n'ai pas réussi à supprimer le rôle à l'utilisateur parce que votre rôle est inférieur au rôle spécifié.",
    DELROLES_ERROR_2: "<:X_:673212163837526064> **Erreur :** Je n'ai pas pu supprimer le rôle à l'utilisateur parce que mon rôle le plus élevé est inférieur au rôle spécifié.",
    DELROLES_INTERNAL_ERROR: ":no_entry_sign: Il y a eu une erreur ! Il est fort probable que le rôle que vous essayez de supprimer soit plus élevé que le rôle que j'ai !",
    DELROLES_SUCESS_1: "**, J'ai supprimé le **",
    DELROLES_SUCESS_2: "** rôle de **",
    /* Ban : */
    SYNTAXE_BAN: "ban [Membre] (Raison)```",
    BAN: "ban",
    AUTOBAN: "<:X_:673212163837526064> **Erreur :** Tu ne peux pas te ban !",
    BANYURA: "<:X_:673212163837526064> **Erreur :** Tu ne peux pas me ban !",
    BAN_NO_REASON: "Aucune raison fournie.",
    BAN_ERROR: "<:X_:673212163837526064> **Erreur :** Une erreur est survenue, je n'ai pas pu le ban !",
    BAN_ERROR_1: "<:X_:673212163837526064> **Erreur:** Je ne peux pas bannir ce membre parce qu'il a un rôle supérieur ou égal au vôtre.",
    BAN_ERROR_2: "<:X_:673212163837526064> **Erreur:** Je ne peux pas bannir ce membre parce qu'il a un rôle plus élevé ou égal au mien.",
    BAN_ERROR_INTERNE: "<:X_:673212163837526064> Je ne peux pas bannir ce membre. Mon rôle n'est peut-être pas assez élevé ou c'est une erreur interne.",
    BAN_SUCESS_MPCLOSE: "<:check:673212026226737153> Je l'ai bien bannis mais je n'ai pas pu le prévenir.",
    BAN_SUCESS_1: "<:X_:673212163837526064> Vous vous êtes fait bannir sur **",
    BAN_SUCESS_2: "** par __",
    BAN_SUCESS_3: "__ pour la raison **",
    /* Unban : */
    SYNTAXE_UNBAN: "unban [Membre] (Raison)```",
    UNBAN: "unban",
    UNBAN_NOBAN: (name) => `<:X_:673212163837526064> | **${name}** n'est pas banni !`,
    UNBAN_INVALIDE_ID: "<:X_:673212163837526064> | Impossible de trouver le membre ! Vérifiez que vous avez bien indiqué un id.",
    UNBAN_SUCESS_1: "<:check:673212026226737153> Vous vous êtes fait unbannir sur **",
    UNBAN_SUCESS_2: "** par __",
    UNBAN_SUCESS_3: "__ pour la raison **",
    UNBAN_SUCESS_MPCLOSE: "<:check:673212026226737153> Je l'ai bien unbannis mais je n'ai pas pu le prévenir.",
    /* Commande Clear : */
    CLEAR_LIMIT: "<:X_:673212163837526064> **Merci de donner un chiffre entre 1 et 100 pour effectuer cette commande.**",
    CLEAR_14DAYS: "<:X_:673212163837526064> **Erreur :** Le bot ne peux pas supprimer les messages vieux de 14 jours !",
    DELETE_MESSAGE: "messages supprimés.**",
    CLEAR: "clear",
    /* Commande Kick : */
    SYNTAXE_KICK: "kick [Membre] (Raison)```",
    AUTOKICK: "<:X_:673212163837526064> **Erreur :** Tu ne peux pas te kick !",
    KICKYURA: "<:X_:673212163837526064> **Erreur :** Tu ne peux pas me ban !",
    KICK_DEV: "Vous ne pouvez pas kicker mon Developer !",
    KICK: "kick",
    KICK_ERROR_1: "<:X_:673212163837526064> **Erreur:** Je ne peux pas expulser ce membre parce qu'il a un rôle supérieur ou égal au vôtre.",
    KICK_ERROR_2: "<:X_:673212163837526064> **Erreur:** Je ne peux pas expulser ce membre parce qu'il a un rôle plus élevé ou égal au mien.",
    KICK_ERROR_INTERNE: "<:X_:673212163837526064> Je ne peux pas expulser ce membre. Mon rôle n'est peut-être pas assez élevé ou c'est une erreur interne.",
    KICK_ERROR: "<:X_:673212163837526064> **Erreur :** Une erreur est survenue, je n'ai pas pu le kick !",
    KICK_SUCESS_MPCLOSE: "<:check:673212026226737153> Je l'ai bien expulser mais je n'ai pas pu le prévenir.",
    KICK_SUCESS_1: "<:X_:673212163837526064> Vous vous êtes fait expuser sur **",
    KICK_SUCESS_2: "** par __",
    KICK_SUCESS_3: "__ pour la raison **",
    /* Commande Lock : */
    LOCK: "lock",
    LOCK_MESSAGE_1: "<:check:673212026226737153> **",
    LOCK_MESSAGE_2: "** vient de verrouiller le canal. Ne vous inquiétez pas, l'administrateur va bientôt rouvrir la discussion, alors soyez patients.",
    LOCK_ALREADYLOCKED: "<:X_:673212163837526064> **Erreur :** Ce salon est déja locker !",
    /* Commande UnLock : */
    UNLOCK: "unlock",
    UNLOCK_MESSAGE: "<:check:673212026226737153> Verrouillage levé, amusez-vous à parler tant que vous le pouvez !",
    UNLOCK_NOLOCKED: "<:X_:673212163837526064> **Erreur :** Ce salon n'est pas locker !",
    /* Commande TimeLock : */
    TIMELOCK: "timelock",
    TIMELOCK_ERROR_TIME: "<:X_:673212163837526064> **Erreur :** Vous devez fixer une durée pour le verrouillage en heures, minutes ou secondes !",
    /* Commande Warn : */
    SYNTAXE_WARN: "warn [Membre] [Raison]```",
    WARN: "warn",
    WARN_MESSAGE_SUCESS_1: ":warning: | L'utilisateur **",
    WARN_MESSAGE_SUCESS_2: "** viens de recevoir un avertissement par **",
    WARN_MESSAGE_SUCESS_3: "** pour la raison suivante : **",
    WARN_MESSAGE_USER_1: ":warning: | Vous avez reçu un avertissement dans le serveur **",
    WARN_MESSAGE_USER_2: "** par ",
    WARN_MESSAGE_USER_3: " pour la raison suivante : **",
    /* Commande Mute : */
    SYNTAXE_MUTE: "mute [Membre] (Raison)```",
    MUTE: "mute",
    AUTOMUTE: "<:X_:673212163837526064> **Erreur:** Vous ne pouvez pas vous mute vous même !",
    USERMUTE: "<:X_:673212163837526064> **Erreur:** L'utilisateur donné est déjà mute !",
    MUTE_ERROR: "<:X_:673212163837526064> **Erreur :** Une erreur est survenue, je n'ai pas pu le mute !",
    MUTE_SUCESS_MP_1: "🔇 Vous vous êtes fait mute sur **",
    MUTE_SUCESS_MP_2: "** par __",
    MUTE_SUCESS_MP_3: "__ pendant ",
    MUTE_SUCESS_MP_4: "Pour la raison ",
    MUTE_SUCESS_MPCLOSE: "<:check:673212026226737153> Je l'ai bien muter mais je n'ai pas pu le prévenir.",
    /* Commande UnMute : */
    SYNTAXE_UNMUTE: "unmute [Membre]```",
    UNMUTE: "unmute",
    UNMUTE_NOMUTE: "<:X_:673212163837526064> **Erreur:** Ce membre n'est pas mute !",
    UNMUTE_SUCESS: (usermute) => `<:check:673212026226737153> | **${usermute}** est unmute !`,
    UNMUTE_SUCESS_MPCLOSE: "<:check:673212026226737153> Je l'ai bien unmuter mais je n'ai pas pu le prévenir.",
    UNMUTE_SENDUSER: (guild) => `<:check:673212026226737153> | Vous êtes unmute sur **${guild}**`,
    UNMUTE_ERROR: "<:X_:673212163837526064> **Erreur:** Une erreur est survenue, je n'ai pas pu l'unmute !",
    /* Commande TempMute : */
    SYNTAXE_TEMPMUTE: "tempmute [Membre] [Temps] (Raison)```",
    TEMPMUTE: "tempmute",
    TEMPMUTE_SUCESS_MP_1: "🔇 Vous êtes fait mute sur **",
    TEMPMUTE_SUCESS_MP_2: "** par __",
    TEMPMUTE_SUCESS_MP_3: "__ pendant ",
    TEMPMUTE_SUCESS_MP_4: "Pour la raison ",
    TEMPMUTE_SUCESS_MPCLOSE: "<:check:673212026226737153> Je l'ai bien unmuter mais je n'ai pas pu le prévenir.",
    TEMPMUTE_UNMUTE_CHANNEL_1: "<:check:673212026226737153> Le membre <@",
    TEMPMUTE_UNMUTE_CHANNEL_2: "> a été unmute !",
    TEMPMUTE_UNMUTE_MP_1: "🔊 Vous êtes unmute sur **",
    TEMPMUTE_UNMUTE_MP_2: "** ! Vous pouvez parler !",
    /* Commande Everyrole : */
    SYNTAXE_EVERYROLE: "everyrole [Role]```",
    EVERYROLE: "everyrole",
    EVERYROLE_MENTION: "<:X_:673212163837526064> **Erreur :** Veuillez mentionner un role !",
    EVERYROLE_NO_ROLEFOUND: (role) => `<:X_:673212163837526064> | Aucun rôle trouvé pour **${role}**.`,
    EVERYROLE_SUCESS: (role) => `<:check:673212026226737153> | J'ai ajouté le rôle **${role}** à **tout le monde**.`,
    /* Utilitaire : */
    ONLINE: "",
    OFFLINE: "",
    DND: "<:dnd:675371548651159573> Ne pas déranger",
    IDLE: "",
    /* Commande ascii : */
    SYNTAXE_ASCII: "ascii [Message]```",
    ASCII: "ascii",
    ASCII_ERROR: "Erreur:",
    ASCII_LIMIT_MESSAGE: "Seulement 20 caractères sont admis.",
    /* Commande addnote : */
    SYNTAXE_ADDNOTE: "addnote [Vos Notes à modifier]```",
    ADDNOTE: "addnote",
    ADDNOTE_SUCESS: "**Vos notes ont bien été actualités avec succès.**",
    /* Commande note : */
    NO_NOTE: "Aucune note enregistré pour le moment.",
    NOTE: "note",
    NOTE_SUCESS: ":pushpin: __**Voici vos notes**__ : ",
    NOTE_SUCESS_MP: "**Vos notes ont été envoyé en message privée.**",
    /* Commande Bvn : */
    SYNTAXE_BVN: "Merci de mentionner un utilisateur pour souhaiter la bienvenue.",
    BVN: "bvn",
    BVN_SUCESS: " vous souhaite bienvenue **",
    /* Commande Calc : */
    SYNTAXE_CALC: "calc [opération]```",
    CALC: "calc",
    CALC_ERROR: "**<:X_:673212163837526064> Erreur :** Vérifiez votre opération !",
    CALC_SUCESS: "```Résultat :\n\n",
    /* Commande Cooldown : */
    SYNTAXE_COOLDOWN: "cooldown [temps]```",
    COOLDOWN: "cooldown",
    COOLDOWN_SUCESS: ":alarm_clock: | Cooldown activé sur **",
    COOLDOWN_END: "** !",
    COOLDOWN_STOP: ":alarm_clock: | Temps écoulé ! Il s'est passé **",
    /* Commande Embed : */
    SYNTAXE_EMBED: "embed | [couleur] | [Titre] | [Déscription] | [Footer]```",
    EMBED: "embed",
    EMBED_SUCESS: "```Résultat :\n\n",
    /* Commande Emojis : */
    EMOJIS_TITLE: "__**<:smiling:675373017005686836> Les emojis sur le serveur :**__",
    EMOJIS: "emojis",
    /* Commande Report-bug : */
    SYNTAXE_REPORT_BUG: "report-bug [Description]```",
    REPORT_BUG: "report-bug",
    /* Commande Finduser : */
    SYNTAXE_FINDUSER: "finduser [id]```",
    FINDUSER: "finduser",
    FINDUSER_ERROR: "**<:X_:673212163837526064> Erreur :** Vérifiez que c'est bien un id !",
    DISCRIMINATOR: "#️⃣ » Discriminateur : #",
    CREATED_AT: "📆 » Crée le : ",
    LAST_MSG: "#️⃣ » Dernier message : ",
    /* Commande Hastebin : */
    SYNTAXE_HASTEBIN: "hastebin [Votre Code]```",
    HASTEBIN: "hastebin",
    HASTEBIN_SUCESS: "`Publié sur Hastebin à cette URL: `  ",
    HASTEBIN_ERROR: "**<:X_:673212163837526064> Erreur :** Hastebin est offline, veuillez réessayer plus tard.",
    /* Commande INVITE : */
    INVITE: "invite",
    INVITE_TITLE: "🔧 Ajouter Yura sur votre serveur discord !",
    INVITE_ADMIN: "__**Lien d'invitation avec les permissions d'administrateurs :**__",
    INVITE_PERSO: "__**Lien d'invitation avec les permissions que vous pouvez personnaliser :**__",
    INVITE_CLICK_HERE: "**Cliquez ici**",
    /* Commande Shorten : */
    SYNTAXE_SHORTEN: "shorten [lien]```",
    SHORTEN: "shorten",
    SHORTEN_SUCESS: "`Lien raccourcis à cette URL: `  ",
    /* Commande BotInfo : */
    BOTINFO: "botinfo",
    BOTINFO_TITLE: "**• Informations du bot •**",
    BOTINFO_CREATOR: "👑 Créateur →",
    BOTINFO_INFOS: "📰 Informations →",
    BOTINFO_STATS: "📊 Statistiques →",
    BOTINFO_STATS_SERVERS: "- `Serveurs` → ",
    BOTINFO_STATS_USERS: "- `Utilisateurs` → ",
    BOTINFO_STATS_CHANNELS: "- `Salons` → ",
    BOTINFO_LINKS: "🔗 • __Liens__ →",
    BOTINFO_LINKS_INVITEBOT: "Inviter le bot",
    BOTINFO_LINKS_SUPPORT: "Serveur Support",
    /* Commande QRCODE : */
    SYNTAXE_QRCODE: "qrcode [lien]```",
    QRCODE: "qrcode",
    QRCODE_DESC: "Voici le qrcode pour : ",
    QRCODE_ERROR: "<:X_:673212163837526064> **Erreur :** Veuillez mettre un lien !",
    /* Commande PASSWORD : */
    PASSWORD: "password",
    SYNTAXE_PASSWORD_1: "Combien de caractères souhaitez-vous ?",
    SYNTAXE_PASSWORD_2: "Le mot de passe peut-il contenir des nombres ? oui/non",
    SYNTAXE_PASSWORD_3: "Le mot de passe peut-il contenir des symboles ? oui/non",
    PASSWORD_NUMBERS: "Veuillez entrer un nombre valide.",
    PASSWORD_YES_NO: "Répondez par `oui` ou par `non` !",
    PASSWORD_YES: "oui",
    PASSWORD_NO: "non",
    PASSWORD_SUCESS_HASTEBIN: "```Le mot de passe compte trop de caractères, il se trouve donc sur hastebin. Le lien : ",
    PASSWORD_SEND: "Mot de passe envoyé en message privé !",
    PASSWORD_GEN: "```Mot de passe généré : ",
    PASSWORD_TIME: "Temps écoulé.",
    /* Commande SERVERINFO : */
    SERVERINFO: "serverinfo",
    SERVERINFO_CREATION: "Creation :",
    SERVERINFO_ID: "ID :",
    SERVERINFO_PROPRIETAIRE: "Proprietaire :",
    SERVERINFO_REGION: "Region :",
    SERVERINFO_USERS: "Utilisateurs :",
    SERVERINFO_MEMBERS: "Membres :",
    SERVERINFO_BOT: "Bot :",
    SERVERINFO_AFK: "AFK Temps :",
    SERVERINFO_ROLES: "Roles :",
    SERVERINFO_CHANNELS: "Channels :",
    SERVERINFO_EMOJIS: "Emojis :",
    SERVERINFO_VERIFICATION: "Verification Level :",
    /* Commande userinfo : */
    SYNTAXE_USERINFO: "userinfo <rien|@user|id>```",
    USERINFO: "userinfo",
    USERINFO_USERS: "Statistiques du l'utilisateur **",
    USERINFO_PSEUDO: "**<:member:729291783602831410> Pseudo ➜**",
    USERINFO_TAG: "**<:channel:729291851601018961> Tag ➜**",
    USERINFO_SURNOM: "**<:emoji:729291695241429022> Surnom ➜**",
    USERINFO_ID: "**<:ID:729291914783752192> Id ➜**",
    USERINFO_ARIVATEDATE: "**💨 Date d'arrivée sur ",
    USERINFO_CREATEDAT: "**💫 Date de création du compte ➜**",
    USERINFO_LASTMSG: "**📨 Dernier message ➜**",
    USERINFO_GAME: "**🕹 Jeu ➜**",
    USERINFO_NO_GAME: "Aucun jeu",
    USERINFO_STATUS: "**🔆 Statut ➜**",
    USERINFO_INFOS: "Informations de l'utilisateur ",
    /* Commande SUGGEST : */
    SYNTAXE_SUGGEST: "suggestion : [Description]```",
    SUGGEST: "suggestions",
    SUGGEST_DESC: "<:check:673212026226737153> Votre suggestion viens d'être envoyé sur le serveur principal.",
    /* Commande SUPPORT : */
    SUPPORT: "support",
    SUPPORT_DESC: "🔧 Rejoignez le serveur support du Yura Bot",
    SUPPORT_FIELD: "**__Voici notre serveur discord de support pour vous aider ou proposer de nouvelles fonctionnalités :__**",
    /* Commande SYSTEMINFO : */
    SYSTEMINFO: "systeminfo",
    SYSTEMINFO_SYSTEM: ":gear: • __Système__",
    SYSTEMINFO_PLATEFORM: "Plateforme : ",
    SYSTEMINFO_CPU: "💻 • __Processeur__",
    SYSTEMINFO_PING: "MB` | Latence avec l'API :",
    /* Economie : */
    ECO_DAYS: "jours",
    ECO_HEUR: "h",
    ECO_MIN: "min",
    ECO_SEC: "sec",
    ECO_COINS: "coins",
    /* Commande Work : */
    WORK: "work",
    WORK_ERROR: "Vous avez déjà travaillé récemment\n\nRéessayez dans ",
    WORK_SUCESS_1: "Vous avez travaillé comme ",
    WORK_SUCESS_1: " et gagné ",
    WORK_PROGRAMMER: "Programmeur",
    WORK_BUILDER: "Buildeur",
    WORK_SERVER: "Serveur",
    WORK_JARDINIER: "Jardinier",
    WORK_CHEF: "Chef cuisinier",
    WORK_MECANICIEN: "Mécanicien",
    /* Commande Balance : */
    BALANCE: "balance",
    BALANCE_DESC_1: "📌 **• __Compte de ",
    BALANCE_DESC_1: "💰 • __Votre argent :__ ",
    BALANCE_DESC_1: "🏦 • __Dans la banque :__ ",
    /* Commande Beg : */
    BEG: "beg",
    BEG_ERROR: "Vous avez déjà mendier récemment\n\nRecommencer dans  ",
    BEG_SUCESS: "Vous avez mandier et reçu ",
    /* Commande Buy : */
    BUY: "buy",
    BUY_BRONZE: "Vous avez besoin de 2000 pièces pour acheter Bronze VIP.",
    BUY_VIP: "Achat d'un VIP en bronze pour 3500 pièces.",
    BUY_NIKES: "Vous avez besoin de 600 pièces pour acheter des Nikes.",
    BUY_FRAICHES: "Achat de Nikes fraîches pour 600 pièces.",
    BUY_CAR: "Vous avez besoin de 800 pièces pour acheter une nouvelle voiture.",
    BUY_NEUVE: "Achat d'une voiture neuve pour 800 pièces.",
    BUY_MANOIR: "Vous avez besoin de 1200 pièces pour acheter un manoir.",
    BUY_GRAND: "Achat d'un manoir pour 1200 pièces.",
    BUY_ERROR: "Saisir un article à acheter.",
    /* Commande daily : */
    DAILY: "daily",
    DAILY_ERROR: "<:X_:673212163837526064> Vous avez déjà récupéré votre récompense quotidienne\n\nRécupérez-la à nouveau dans ",
    DAILY_SUCESS: "<:check:673212026226737153> Vous avez collecté votre récompense quotidienne de ",
    /* Commande weekly : */
    WEEKLY: "weekly",
    WEEKLY_ERROR: "Vous avez déjà récupéré votre récompense hebdomadaire\n\nRécupéré la à nouveau dans ",
    WEEKLY_SUCESS: "Vous avez récupéré votre récompense hebdomadaire de ",
    /* Commande deposit : */
    DEPOSIT: "deposit",
    DEPOSIT_NO_MONEY: "<:X_:673212163837526064> Vous n'avez pas d'argent à déposer.",
    DEPOSIT_DEP_ALL: "<:check:673212026226737153> Vous avez déposé toutes vos pièces dans votre banque.",
    DEPOSIT_MONTANT: "<:X_:673212163837526064> Préciser un montant à déposer.",
    DEPOSIT_NEGATIF: "<:X_:673212163837526064> Vous ne pouvez pas déposer de l'argent négatif.",
    DEPOSIT_AUTANT_MONEY: "<:X_:673212163837526064> Vous n'avez pas autant d'argent",
    DEPOSIT_SUCESS_1: "<:check:673212026226737153> Vous avez déposé ",
    DEPOSIT_SUCESS_2: " coins dans votre banque !",
    /* Commande pay : */
    PAY: "pay",
    PAY_USER: "<:X_:673212163837526064> Mentionner quelqu'un à payer.",
    PAY_MONTANT: "<:X_:673212163837526064> Spécifiez un montant à payer.",
    PAY_NEGATIF: "<:X_:673212163837526064> Vous ne pouvez pas payer à quelqu'un de l'argent négatif.",
    PAY_ARGENT: "<:X_:673212163837526064> Vous n'avez pas beaucoup d'argent.",
    PAY_SUCESS: "<:check:673212026226737153> Vous avez payé ",
    /* Commande profile : */
    PROFILE: "profile",
    PROFILE_TITLE: "📌 **• __Profil de ",
    PROFILE_MONEY: " :__**\n\n💰 • __Votre argent :__ ",
    PROFILE_BANQUE: "\n🏦 • __Dans la banque :__ ",
    PROFILE_RANK: "\n💎 • __Votre rank :__ ",
    PROFILE_INV: "\n\n**💼 • __Votre Inventaire :__**\n\n__Nikes__: ",
    PROFILE_CAR: "\n__Voitures__: ",
    PROFILE_HOUSE: "\n__Maisons__ : ",
    /* Commande rob : */
    ROB: "rob",
    ROB_TIME: "<:X_:673212163837526064> Vous avez déjà volé quelqu'un\n\n Réessayez dans ",
    ROB_COINS: "<:X_:673212163837526064> Vous avez besoin d'au moins 200 coins dans votre portefeuille pour voler quelqu'un !",
    ROB_ANY: " n'a rien à voler.",
    ROB_SUCESS_1: "<:check:673212026226737153> Tu as volé ",
    ROB_SUCESS_2: " et tu est partis avec ",
    /* Commande roulette : */
    ROULETTE: "roulette",
    ROULETTE_SYNTAXE: "roulette [color] [amount]",
    ROULETTE_PLUS: "<:X_:673212163837526064> Vous pariez plus que vous n'avez !",
    ROULETTE_COLOR: "<:X_:673212163837526064> Spécifier une couleur | Red [1.5x] Black [2x] Green [15x]",
    ROULETTE_WIN_GREEN_1: "<:Green:618767721361833995> Vous avez gagné ",
    ROULETTE_WIN_GREEN_2: " coins\n\nMultiplier: 15x",
    ROULETTE_WIN_RED_1: "<:Red:618767705444450342> Vous avez gagné ",
    ROULETTE_WIN_RED_2: "<:Red:618767705444450342> Vous avez gagné ",
    ROULETTE_WIN_BLACK_1: "<:Black:618767682996666408> Vous avez gagné ",
    ROULETTE_WIN_BLACK_2: " coins\n\nMultiplier: 2x",
    ROULETTE_LOSE_1: "<:X_:673212163837526064> Vous avez perdu ",
    ROULETTE_LOSE_2: " coins\n\nMultiplier: 0x",
    /* Commande sell : */
    SELL: "sell",
    SELL_NIKES: "Vous n'avez pas de Nikes à vendre.",
    SELL_NIKES_SELL: "Nikes frais vendus pour 600 pièces.",
    SELL_CAR: "Vous n'avez pas de voiture à vendre.",
    SELL_CAR_SELL: "Vendu une voiture pour 800 pièces.",
    SELL_HOUSE: "Vous n'avez pas de manoir à vendre.",
    SELL_HOUSE_SELL: "Vendu un manoir pour 1200 pièces.",
    /* Commande slots : */
    SLOTS: "slots",
    SLOTS_PLUS: "Vous pariez plus que vous n'avez.",
    SLOTS_MONTANT: "Précisez un montant.",
    SLOTS_WIN: "Vous gagnez ",
    SLOTS_LOSE: "Vous perdez ",
    /* Commande store : */
    STORE: "store",
    STORE_DESC: "**VIP Ranks**\n\nBronze: 3500 Coins [?buy bronze]\n\n**Articles sur le mode de vie**\n\nFresh Nikes: 600 [?buy nikes]\nVoiture : 800 [?buy car]\nMansion: 1200 [?buy mansion]",
    /* Commande storeinfo : */
    STOREINFO: "storeinfo",
    STOREINFO_BRONZE: "**Bronze Rank**\n\nAvantages: Possibilité d'obtenir plus de pièces en volant quelqu'un !",
    STOREINFO_NIKES: "**Fresh Nikes**\n\nAvantages: Chance de gagner des pièces, des rôles sur notre serveur Discord + Plus en menant le classement !",
    STOREINFO_CAR: "**Car**\n\nAvantages: Chance de gagner des pièces, des rôles sur notre serveur Discord + Plus en menant le classement !",
    STOREINFO_MANSON: "**Mansion**\n\nAvantages: Chance de gagner des pièces, des rôles sur notre serveur Discord + Plus en menant le classement !",
    /* Commande withdraw : */
    WITHDRAW: "withdraw",
    WITHDRAW_PLUS_MONEY: "Vous avez retiré toutes vos pièces de monnaie de votre banque.",
    WITHDRAW_MONTANT: "Spécifiez un montant à retirer dans la banque.",
    WITHDRAW_NEGATIF: "Vous ne pouvez pas retirer d'argent négatif.",
    WITHDRAW_BEAUCOUP: "Vous n'avez pas beaucoup d'argent à la banque.",
    WITHDRAW_SUCESS_1: "Vous vous êtes retiré ",
    WITHDRAW_SUCESS_2: "V pièces de monnaie de votre banque.`",
    /* Games : */
    /* Commande mc-server : */
    SYNTAXE_MC_SERVER: "mc-server [server]```",
    ONLINE: "En ligne",
    OFFLINE: "Hors ligne",
    MC_SERVER_ONLINE_PLAYER: "<:minecraftsword:675369153833467930> » Online Players : ",
    MC_SERVER: "mc-server",
    MC_SERVER_NO_FOUND: "**<:X_:673212163837526064> Erreur :** Aucun serveur trouvé, veuillez réessayer.",
    /* Commande mc-achivements : */
    SYNTAXE_MC_ACHIVEMENT: "mc-achivements | [block] | [title] | [description1] | (description2)```",
    MC_ACHIVEMENT: "mc-achivements",
    MC_ACHIVEMENT_ERROR: "**<:X_:673212163837526064> Erreur :** Veuillez vérifier que vos phrases ne sont pas trop longues et que le bloc est valide.",
    /* Commande mc-user : */
    SYNTAXE_MC_USER: "mc-user [Pseudo]```",
    MC_USER_NAME: "<:idverified:675370524825747486> » Nom : ",
    MC_USER_GET_HEAD: "<:smiling:675373017005686836> » Commande pour obtenir la tête : ",
    MC_USER: "mc-user",
    MC_USER_NO_FOUND: "**<:X_:673212163837526064> Erreur :** Aucun utilisateur trouvé, veuillez réessayer.",
};

const translate = (key, ...args) => {
    const translation = languageData[key]; 
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translate;