const languageData = {
    GENERATION: " Génération en cours...",
    PING_BEFORE: " Calcul en cours...",
    PING_AFTER: " **»** Latence du bot : `",
    PING: (ms) => `Pong! Latence du bot: ${ms}ms`,
    LANGUAGE: "Anglais | EN | English",
    ERRROR_BOT: "<:X_:673212163837526064> **Erreur :**",
    SYNTAXE: "<:X_:673212163837526064> Votre syntaxe est incorrecte. \n```Syntaxe : ",
    X_EMOJI: "<:X_:673212163837526064> ",
    MSG_MENTION: (prefix) => `<a:heyy:784089404774809600> Bonjour, moi c'est Yura ! Mon prefix sur ce serveur est **${prefix}** ! \nDonc pour voir le menu d'aide fait **${prefix}help**.`,
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
    /* EVENTS : */
    /* Emit : */
    SYNTAXE_EMIT: "emit [Votre event]``` \n**📋 Les events :** \n- welcome \n- goodbye",
    EMIT_WELCOME_SUCESS: "<:check:673212026226737153> | Event welcome enclanché !",
    EMIT_GOODBYE_SUCESS: "<:check:673212026226737153> | Event goodbye enclanché !",
    EMIT_ERROR: "<:X_:673212163837526064> | Aucun event trouvé.",
    /* Message : */
    EVENTS_MESSAGE_ANTIRAID_WARN: "**<:X_:673212163837526064> {@user}, Arrête de spammer !**",
    EVENTS_MESSAGE_ANTIRAID_KICK: "**<:X_:673212163837526064> {user_tag}, A été expulsé pour spam !**",
    EVENTS_MESSAGE_ANTIRAID_BAN: "**<:X_:673212163837526064> {user_tag}, A été bannis pour spam !**",
    ANTILINK_TITLE: "⚠️ Il est interdit de poster des liens ici !",
    ANTILINK_USER: "⚡__Utilisateur__ :",
    ANTILINK_ACTION: "🔒 __Action__ :",
    ANTILINK_DELETED: "Automatiquement supprimé.",
    ANTILINK_SUCESS: "**<:X_:673212163837526064> Les liens sont interdits sur ce serveur, votre message a donc été supprimé !**",
    ANTIPUB_SUCESS: "**<:X_:673212163837526064> Les invitations sont interdites sur ce serveur, votre message a donc été supprimé !**",
    ANTIBADWORLDS_SUCESS: "**<:X_:673212163837526064> Ce mot est filtré sur ce serveur, votre message a donc été supprimé !**",
    /* GuildMemberAdd : */
    EVENTS_GUILDMEMBERADD_WELCOME_ERROR: "<:X_:673212163837526064> | Une erreur est survenue : le message de bienvenue n\'a pas pu être envoyé car le salon est introuvable. Veuillez re-setup le système.",
    EVENTS_GUILDMEMBERADD_AUTOROLE_ERROR: "<:X_:673212163837526064> | Une erreur est survenue : l\'autôrole n\'a pas pu être activé car le role est introuvable.",
    EVENTS_GUILDMEMBERADD_WELCOME_EMBED_FOOTER: (memberCount) => `Nous sommes désormais ${memberCount} !`,
    WELCOME: "Bienvenue",
    WELCOME_ON: "Bienvenue sur {server}",
    MEMBER_COUNT: "- {count}ème membre !",
    /* GuildMemberRemove : */
    EVENTS_GUILDMEMBERREMOVE_GOODBYE_ERROR: "<:X_:673212163837526064> | Une erreur est survenue : l\'autôrole n\'a pas pu être activé car le role est introuvable.",
    /* Commande Help : */
    HELP_YURA: ":pushpin: Aide Yura'Bot",
    HELP_INFOS: "Pour **plus d'informations** sur une commande:\n",
    HELP_TITLE: (CS) => `Nombre de commandes : **${CS}** \n`,
    HELP_PREFIX: (prefix) => `Prefix sur ce serveur : **${prefix}** \n\n`,
    HELP_LISTCMDS: "__**Voici la liste des commandes :**__  \n\n",
    HELP_ADMIN: "<:adminsettingsmale:675368904637546506> • Commandes Administration : (**",
    HELP_MOD: ":rotating_light: • Commandes Modération : (**",
    HELP_UTIL: ":gear: • Commandes Utilitaires : (**",
    HELP_FUN: ":tada: • Commandes Fun : (**",
    HELP_MUSIC: ":notes: • Commandes Musique : (**",
    HELP_GIVEAWAY: ":gift: • Commandes de Giveaways : (**",
    HELP_IMG: ":sunrise_over_mountains: • Commandes Images : (**",
    HELP_GAME: ":video_game: • Commandes De Jeux : (**",
    HELP_NSFW: ":underage: • Commandes NSFW : (**",
    HELP_BOT: ":robot: • Commandes bot : (**",
    HELP_LINKS: "🔗 • __Liens__ :",
    HELP_WEBSITE: "Site",
    HELP_INVITEBOT: "Inviter le bot",
    HELP_SERVSUPPORT: "Serveur Support",
    HELPCMD_TITLE: ":question: Aide sur la commande '",
    HELPCMD_LEGENDE: "• Légende pour l'utilisation:\n",
    HELPCMD_LEGENDE_2: "() : Optionnel | [] : Obligatoire",
    HELPCMD_NAMECMD: "▶ Nom de la commande :",
    HELPCMD_UTILISATIONCMD: "▶ Utilisation :",
    HELPCMD_DESCCMD: "▶ Description de la commande :",
    HELPCMD_ALIASESCMD: "▶ Aliase(s) de la commande :",
    HELPCMD_NODESC: "Aucune description pour cette commande.",
    HELPCMD_NOALIASES: "Aucune aliases pour cette commande.",
    /* ADMIN : */
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
    /* Lotterie : */
    LOTTERIE_WIN: " Toutes nos félicitations !",
    LOTTERIE_LOSE: " plus de chance la prochaine fois.",
    LOTTERIE: "lottery",
    /* Animaux : */
    CAT:"Chat",
    DOG:"Chien",
    FOX: "Renard",
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
    GIVEAWAY_END_ERROR_OCCURED: "<:X_:673212163837526064> **Erreur :** Une erreur interne est survenue !",
    /* Giveaway Reroll : */
    GIVEAWAY_REROLL: "reroll-giveaway",
    SYNTAXE_GIVEAWAY_REROLL: "reroll-giveaway [Message ID du Giveaway]```",
    GIVEAWAY_REROLL_NO_FOUND: "Le giveaway n’a pas été trouvé :( ",
    GIVEAWAY_REROLL_SUCESS: "Le Giveaway a été relancer !",
    GIVEAWAY_REROLL_NO_END_1: "Le Giveaway avec le message ID ",
    GIVEAWAY_REROLL_NO_END_2: " n'est pas terminer.",
    GIVEAWAY_REROLL_NO_END: "Ce giveaway n’est pas fini !",
    GIVEAWAY_REROLL_ERROR_OCCURED: "<:X_:673212163837526064> **Erreur :** Une erreur interne est survenue !",
    /* Giveaway Edit : */
    GIVEAWAY_EDIT: "edit-giveaway",
    SYNTAXE_GIVEAWAY_EDIT: "edit-giveaway [ID] [Nombre de gagnants] [Nouveau Prix]```",
    GIVEAWAY_EDIT_NO_FOUND: "Impossible de trouver un Giveaway pour ",
    GIVEAWAY_EDIT_SUCESS: "Je suis en train de modifier le concours avec les nouveaux paramètres. Les modifications seront prises en compte dans 5 secondes.",
    GIVEAWAY_EDIT_ERROR_OCCURED: "<:X_:673212163837526064> **Erreur :** Une erreur interne est survenue !",
    /* Drop : */
    DROP: "drop",
    SYNTAXE_DROP: "drop [Lot]```",
    DROP_DESC_1: (author) => `😃 \`Par\` ➔ ${author}`,
    DROP_DESC_2: (dropPrize) => `🥇 \`Lot\` ➔ ${dropPrize} \n\n→ Le premier qui clique sur la réaction 🎊 remporte le lot mis en jeu !`,
    DROP_WIN_DESC_1: (dropPrize) => `🥇 \`Lot\` ➔ ${dropPrize} \n\n`,
    DROP_WIN_DESC_2: (winner) => `➡ **Nous avons un gagnant !** \n\n→ <@${winner}>`,
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
    KICKYURA: "<:X_:673212163837526064> **Erreur :** Tu ne peux pas me kick !",
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
    SYNTAXE_EMBED: "embed [couleur] | [Titre] | [Déscription] | [Footer]```",
    EMBED: "embed",
    EMBED_SUCESS: "```Résultat :\n\n",
    /* Commande Emojis : */
    EMOJIS_TITLE: "__**<:smiling:675373017005686836> Les emojis sur le serveur :**__",
    EMOJIS: "emojis",
    /* Commande Report-bug : */
    SYNTAXE_REPORT_BUG: "report-bug [Description]```",
    REPORT_BUG: "report-bug",
    /* Commande web-ping : */
    SYNTAXE_WEB_PING: "web-ping [site]```",
    WEB_PING: "web-ping",
    WEB_PING_NOSITEFOUND: "<:X_:673212163837526064> **Erreur : Site introuvable !**",
    WEB_PING_SUCESS: "<:check:673212026226737153> | Ping du site",
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
    /* Commande Morse : */
    SYNTAXE_MORSE: "morse [Texte]```",
    MORSE: "morse",
    MORSE_SUCESS: "<:check:673212026226737153> **__Résultat :\n\n__**",
    /* Commande BotInfo : */
    BOTINFO: "botinfo",
    BOTINFO_TITLE: "**• Informations du bot •**",
    BOTINFO_CREATOR: "👑 Créateur →",
    BOTINFO_UPTIME: "⏲ Uptime →",
    BOTINFO_INFOS: "📰 Informations →",
    BOTINFO_STATS: "📊 Statistiques →",
    BOTINFO_STATS_SERVERS: "- `Serveurs` → ",
    BOTINFO_STATS_USERS: "- `Utilisateurs` → ",
    BOTINFO_STATS_CHANNELS: "- `Salons` → ",
    BOTINFO_STATS_PING: "- `Discord Ping` → ",
    BOTINFO_VERSION: ":robot: • __Versions__",
    BOTINFO_SYSTEM: ":gear: • __Système__",
    BOTINFO_LINKS: "🔗 • __Liens__ →",
    BOTINFO_LINKS_INVITEBOT: "Inviter le bot",
    BOTINFO_LINKS_SUPPORT: "Serveur Support",
    /* Commande QRCODE : */
    SYNTAXE_QRCODE: "qrcode [lien]```",
    QRCODE: "qrcode",
    QRCODE_DESC: "Voici le qrcode pour : ",
    QRCODE_ERROR: "<:X_:673212163837526064> **Erreur :** Veuillez mettre un lien !",
    /* Commande SERVERINFO : */
    SERVERINFO: "serverinfo",
    SERVERINFO_NO_ROLES: "Aucun",
    SERVERINFO_NAME: "🎟️ Nom ➜",
    SERVERINFO_CREATION: "🎂 Crée le ➜",
    SERVERINFO_ID: "<:ID:729291914783752192> Identifiant ➜",
    SERVERINFO_PROPRIETAIRE: "👑 Propriétaire :",
    SERVERINFO_REGION: "<:card:729291679038701578> Région ➜",
    SERVERINFO_USERS: "<:member:729291783602831410> Utilisateurs ➜",
    SERVERINFO_BOT: "<:bot:675366957687504930> Bot(s) ➜",
    SERVERINFO_AFK: ":zzz: Temps d'inactivité ➜",
    SERVERINFO_ROLES: "<:role:729295590730760195> Roles ➜",
    SERVERINFO_CHANNELS: "<:channel:729291851601018961> Salons ➜",
    SERVERINFO_EMOJIS: "<:emoji:729291695241429022> Emojis ➜",
    SERVERINFO_VERIFICATION: "<:RCP:729295624822063144> Niveau de vérification ➜",
    SERVERINFO_STATS: "<:horizontalsettingsmixer:675372744950677534> Statistiques ➜",
    SERVERINFO_STATS_ONLINE: "↳ <:online:675371850905157653> En Ligne : ",
    SERVERINFO_STATS_STREAM: "\n↳ <:stream:729302786994470932> En Streaming : ",
    SERVERINFO_STATS_AFK: "\n↳ <:idle:675371429264359424> AFK : ",
    SERVERINFO_STATS_DND: "\n↳ <:dnd:675371548651159573> Ne pas déranger : ",
    SERVERINFO_STATS_OFFLINE: "\n↳ <:offline:675371685792186409> Hors Ligne : ",
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
    SYNTAXE_SUGGEST: "suggest : [Description]```",
    SUGGEST: "suggest",
    SUGGEST_ERROR_NO_SYSTEM: "<:X_:673212163837526064> | Vous n'avez pas activé le système de suggestion votre serveur !",
    SUGGEST_ERROR_NO_CHANNEL: "<:X_:673212163837526064> | Le channel n'a pas été trouvé !",
    SUGGEST_ERROR: "<:X_:673212163837526064> **Erreur :** Une erreur est survenue la suggestion n'a pas été envoyé !",
    SUGGEST_TITLE: "Nouvelle suggestion !",
    SUGGEST_AUTHOR: "💼 __Auteur :__",
    SUGGEST_DESC: "📝 __Description :__",
    SUGGEST_SUCESS: "<:check:673212026226737153> Votre suggestion viens d'être envoyé !",
    /* Commande SUPPORT : */
    SUPPORT: "support",
    SUPPORT_DESC: "🔧 Rejoignez le serveur support du Yura Bot",
    SUPPORT_FIELD: "**__Voici notre serveur discord de support pour vous aider ou proposer de nouvelles fonctionnalités :__**",
    /* Commande SYSTEMINFO : */
    SYSTEMINFO: "systeminfo",
    SYSTEMINFO_SYSTEM: ":gear: • __Système__",
    SYSTEMINFO_PLATEFORM: "Plateforme : ",
    SYSTEMINFO_CPU: "💻 • __Processeur__",
    SYSTEMINFO_PING: "MB` | Latence avec l'API : ",
    /* Games : */
    /* Commande mc-server : */
    SYNTAXE_MC_SERVER: "mc-server [server]```",
    ONLINE: "En ligne",
    OFFLINE: "Hors ligne",
    MC_SERVER_ONLINE_PLAYER: "<:minecraftsword:675369153833467930> » Joueurs en ligne : ",
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
    /* Commande Rockstar Status : */
    RGS_TITLE: "<:rockstar:777553264882352188> Status des jeux rockstar : ",
    RGS_ONLINE: " En ligne !",
    RGS_OFFLINE: " Hors Ligne !",
};

const translate = (key, ...args) => {
    const translation = languageData[key]; 
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translate;