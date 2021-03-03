const languageData = {
    GENERATION: " Generation in progress...",
    PING_BEFORE: " Calculation in progress...",
    PING_AFTER: " **»** Bot latency : `",
    PING: "Pong! Bot latency: {ping}ms",
    LANGUAGE: "Anglais | EN | English",
    ERRROR_BOT: "<:X_:673212163837526064> **Error :**",
    SYNTAXE: "<:X_:673212163837526064> Your syntax is incorrect. \n```Syntax : ",
    DASHCONFIG: "**<:horizontalsettingsmixer:675372744950677534> To configure the bot you have to go here : https://dash.yurabot.xyz <-**",
    COOLDOWNBOT: "<:X_:673212163837526064> **You must wait** \`{time}\` **before you can use this command again!**",
    MSG_MENTION: "<a:heyy:784089404774809600> Hi, I'm Yura! My prefix on this server is \`{prefix}\` ! \nSo to see the help menu do **{prefix}help**.",
    /* Permissions : */
    MISSING_PERMISSION_ADMINISTRATOR: "<:X_:673212163837526064> **You do not have the necessary permissions to make this command !** \n **You must have permission `ADMINISTRATOR` !**",
    MISSING_PERMISSION_MANAGE_GUILD: "<:X_:673212163837526064> **You do not have the necessary permissions to make this command !** \n **You must have permission `MANAGE_GUILD` !**",
    MISSING_PERMISSION_MANAGE_MESSAGES: "<:X_:673212163837526064> **You do not have the necessary permissions to make this command !** \n **You must have permission `MANAGE_MESSAGES` !**",
    MISSING_PERMISSION_MANAGE_ROLES: "<:X_:673212163837526064> **You do not have the necessary permissions to make this command !** \n **You must have permission `MANAGE_ROLES` !**",
    MISSING_PERMISSION_MUTE_MEMBERS: "<:X_:673212163837526064> **You do not have the necessary permissions to make this command !** \n **You must have permission `MUTE_MEMBERS` !**",
    MISSING_PERMISSION_KICK_MEMBERS: "<:X_:673212163837526064> **You do not have the necessary permissions to make this command !** \n **You must have permission `KICK_MEMBERS` !**",
    MISSING_PERMISSION_BAN_MEMBERS: "<:X_:673212163837526064> **You do not have the necessary permissions to make this command !** \n **You must have permission `BAN_MEMBERS` !**",
    /* Permissions Yura : */
    BOT_PERMISSION_MANAGE_ROLES: "<:X_:673212163837526064> **Error :** I do not have permission `MANAGE_ROLES` !",
    BOT_PERMISSION_ADMINISTRATOR: "<:X_:673212163837526064> **Error :** I do not have permission `ADMINISTRATOR` !",
    /* EVENTS : */
    /* Emit : */
    SYNTAXE_EMIT: "emit [Your event]``` \n**📋 Events :** \n- welcome \n- goodbye",
    EMIT_WELCOME_SUCESS: "<:check:673212026226737153> | Event welcome underway !",
    EMIT_GOODBYE_SUCESS: "<:check:673212026226737153> | Event goodbye underway !",
    EMIT_ERROR: "<:X_:673212163837526064> | No events found.",
    /* Message : */
    EVENTS_MESSAGE_ANTIRAID_WARN: "**<:X_:673212163837526064> {@user}, Stop spamming !**",
    EVENTS_MESSAGE_ANTIRAID_KICK: "**<:X_:673212163837526064> {user_tag}, Has been kicked out for spam !**",
    EVENTS_MESSAGE_ANTIRAID_BAN: "**<:X_:673212163837526064> {user_tag}, Has been banned for spam !**",
    ANTILINK_TITLE: "⚠️ It is forbidden to post links here!",
    ANTILINK_USER: "⚡__User__ :",
    ANTILINK_ACTION: "🔒 __Action__ :",
    ANTILINK_DELETED: "Automatically deleted.",
    ANTILINK_SUCESS: "**<:X_:673212163837526064> Links are forbidden on this server, so your message has been deleted!**",
    ANTIPUB_SUCESS: "**<:X_:673212163837526064> Invitations are not allowed on this server, so your message has been deleted!**",
    ANTIBADWORLDS_SUCESS: "**<:X_:673212163837526064> This word is filtered on this server, so your message has been deleted!**",
    /* GuildMemberAdd : */
    EVENTS_GUILDMEMBERADD_WELCOME_ERROR: "<:X_:673212163837526064> | An error has occurred: the welcome message could not be sent because the salon could not be found. Please re-setup the system.",
    EVENTS_GUILDMEMBERADD_AUTOROLE_ERROR: "<:X_:673212163837526064> | An error occurred: the auto-role could not be activated because the role could not be found.",
    EVENTS_GUILDMEMBERADD_WELCOME_EMBED_FOOTER: "We are now {memberCount} !",
    WELCOME: "Welcome",
    WELCOME_ON: "Welcome to {server}",
    MEMBER_COUNT: "- {count}th member !",
    /* guildMemberRemove */
    GOODBYE: "Goodbye",
    GOODBYE_ON: "Leaving from {server}",
    /* GuildMemberRemove : */
    EVENTS_GUILDMEMBERREMOVE_GOODBYE_ERROR: "<:X_:673212163837526064> | An error occurred: the auto-role could not be activated because the role could not be found.",
    /* Commande Help : */
    HELP_YURA: ":pushpin: Help Yura'Bot",
    HELP_INFOS: "For **more information** on a command :\n",
    HELP_TITLE: "Number of commands : **{CS}** \n",
    HELP_PREFIX: "Prefix on this server : **{prefix}** \n\n",
    HELP_LISTCMDS: "__**Here is the list of commands :**__  \n\n",
    HELP_ADMIN: "<:adminsettingsmale:675368904637546506> • Commands Administration : (**",
    HELP_MOD: ":rotating_light: • Commands Moderation : (**",
    HELP_UTIL: ":gear: • Utility Commandss : (**",
    HELP_FUN: ":tada: • Fun Commands : (**",
    HELP_MUSIC: ":notes: • Music Commands : (**",
    HELP_GIVEAWAY: ":gift: • Giveaways Commands : (**",
    HELP_IMG: ":sunrise_over_mountains: • Image Commands : (**",
    HELP_GAME: ":video_game: • Game Commands : (**",
    HELP_NSFW: ":underage: • NSFW Commands : (**",
    HELP_BOT: ":robot: • Bot Commands : (**",
    HELP_LINKS: "🔗 • __Links__ :",
    HELP_WEBSITE: "Website",
    HELP_INVITEBOT: "Invite the bot",
    HELP_SERVSUPPORT: "Server Support",
    HELPCMD_TITLE: ":question: Help on the command '",
    HELPCMD_LEGENDE: "• Legend for use:\n",
    HELPCMD_LEGENDE_2: "() : Optional | [] : Required",
    HELPCMD_NAMECMD: "▶ Name of the command :",
    HELPCMD_UTILISATIONCMD: "▶ Use :",
    HELPCMD_DESCCMD: "▶ Description of the command :",
    HELPCMD_ALIASESCMD: "▶ Alias(es) of the command :",
    HELPCMD_NODESC: "No description for this command.",
    HELPCMD_NOALIASES: "No aliases for this command.",
    /* ADMIN : */
    /* Commande Backup : */
    BACKUP_CREATE: "create-backup",
    BACKUP_LOAD: "load-backup",
    LOADING: "**<a:loading:675233191870595082> Loading...**",
    BACKUP_COMMAND: "<:check:673212026226737153> | The backup has been created! To load it, type this command on the server of your choice: `",
    BACKUP_SAVE: "<:check:673212026226737153>  Creating a successful backup. The backup ID was sent in dm !",
    BACKUP_IDVALIDE: "<:X_:673212163837526064>  | You must specify a valid Backup ID!",
    BACKUP_LOAD_CONFIRM: ":warning: | When the backup is loaded, all channels, roles, etc. will be replaced! Type `-confirm` to confirm!",
    BACKUP_LOAD_CONFIRM_CANCEL: "<:X_:673212163837526064>  | Time's up! Backup loading canceled!",
    BACKUP_LOAD_SUCESS: "<:check:673212026226737153>  | Start loading the backup!",
    BACKUP_ERROR: "<:X_:673212163837526064>  | Sorry, an error has occurred... Please check that I have administrator permissions!",
    BACKUP_NO_FOUND: "<:X_:673212163837526064> | No backups found for `",
    /* Commande Annonce : */
    SYNTAXE_ANNONCE: "announcement [Description]```",
    ANNONCE: "announcement",
    ANNONCE_TITLE: "📌 __Announcement :__",
    /* Commande Sondage : */
    SYNTAXE_SONDAGE: "sondage [QUESTION]```",
    SONDAGE: "sondage",
    SONDAGE_TITLE: "📊 __Survey :__",
    SONDAGE_FIELD: "Take the survey now with ✅ ou ❌ !",
    /* FUN : */
    /* 8ball : */
    SYNTAXE_8BALL: "8ball [Your Question]````",
    BALL: "8ball",
    QUESTION: "__**:interrobang: Question :**__",
    REPONSE: "Answer :",
    YES: "Yes !",
    NO: "No !",
    PEUT_ETRE: "Maybe !",
    PROB_YES: "Probably yes !",
    PROB_No: "Probably not !",
    /* Avatar : */
    MESSAGE_AVATAR: "Here is the avatar of ",
    AVATAR: "avatar",
    /* Joke : */
    TITLE_JOKE: "**__🎭 Joke :__**",
    JOKE: "blague",
    /* Lotterie : */
    LOTTERIE_WIN: " Congratulations!",
    LOTTERIE_LOSE: " better luck next time.",
    LOTTERIE: "lottery",
    /* Animaux : */
    CAT:"Cat",
    DOG:"Dog",
    FOX: "Fox",
    /* Giveaway : */
    /* Giveaway Start : */
    SYNTAXE_GIVEAWAY_START: "start-giveaway [Channel] [Time] [Number of winners] [Awards] ```",
    GIVEAWAY_START: "start-giveaway",
    GIVEAWAY_GO: "The Giveaway has just started at the salon ",
    GIVEAWAY_START_TITLE: "🎉🎉 **GIVEAWAY** 🎉🎉",
    GIVEAWAY_START_ENDED: "🎉🎉 **GIVEAWAY FINISHED** 🎉🎉",
    GIVEAWAY_START_TIME_REMAINING: "Remaining time : **{duration}**! ",
    GIVEAWAY_START_REACT: "React with 🎉 to participate!",
    GIVEAWAY_START_WIN_MESSAGE: "ongratulations, {winners}! You have won **{prize}** !",
    GIVEAWAY_START_FOOTER: "Giveaways by Yura",
    GIVEAWAY_START_NO_WINER: "Contest cancelled, no valid participation.",
    GIVEAWAY_START_WINER: "Winner(s)",
    GIVEAWAY_START_ENDED_AT: "Finished at",
    GIVEAWAY_START_SECONDS: "seconds",
    GIVEAWAY_START_MINUTES: "minutes",
    GIVEAWAY_START_HOURS: "hours",
    GIVEAWAY_START_DAYS: "days",
    /* Giveaway End : */
    GIVEAWAY_END: "end-giveaway",
    GIVEAWAY_END_ID_INVALIDE: "You must specify a valid message ID",
    GIVEAWAY_END_ERROR: "Unable to find a Giveaway for ",
    GIVEAWAY_END_SUCESS: "The Giveaway will be over in less than ",
    GIVEAWAY_END_ID_NO_TERMINER_1: "Giveaway with message ID ",
    GIVEAWAY_END_ID_NO_TERMINER_2: " is not finished.",
    GIVEAWAY_END_NO_TERMINER: "This giveaway is not finished!",
    GIVEAWAY_END_ERROR_OCCURED: "<:X_:673212163837526064> **Error :** An internal error has occurred !",
    /* Giveaway Reroll : */
    GIVEAWAY_REROLL: "reroll-giveaway",
    SYNTAXE_GIVEAWAY_REROLL: "reroll-giveaway [Message ID of the Giveaway]```",
    GIVEAWAY_REROLL_NO_FOUND: "The giveaway was not found :( ",
    GIVEAWAY_REROLL_SUCESS: "The Giveaway has been relaunched !",
    GIVEAWAY_REROLL_NO_END_1: "The Giveaway with the message ID ",
    GIVEAWAY_REROLL_NO_END_2: " is not finished.",
    GIVEAWAY_REROLL_NO_END: "This giveaway is not over!",
    GIVEAWAY_REROLL_ERROR_OCCURED: "<:X_:673212163837526064> **Error :** An internal error has occurred !",
    /* Giveaway Edit : */
    GIVEAWAY_EDIT: "edit-giveaway",
    SYNTAXE_GIVEAWAY_EDIT: "edit-giveaway [ID] [Number of winners] [New Price]```",
    GIVEAWAY_EDIT_NO_FOUND: "Unable to find a Giveaway for ",
    GIVEAWAY_EDIT_SUCESS: "I'm modifying the contest with the new settings. The changes will be taken into account in 5 seconds.",
    GIVEAWAY_EDIT_ERROR_OCCURED: "<:X_:673212163837526064> **Error :** An internal error has occurred !",
    /* Drop : */
    DROP: "drop",
    SYNTAXE_DROP: "drop [Price]```",
    DROP_DESC_1: "😃 \`By\` ➔ {author}",
    DROP_DESC_2: "🥇 \`Price\` ➔ {dropPrize} \n\n→ The first one who clicks on the reaction 🎊 wins the prize!",
    DROP_WIN_DESC_1: "🥇 \`Price\` ➔ {dropPrize} \n\n",
    DROP_WIN_DESC_2: "➡ **We have a winner!** \n\n→ <@{winner}>",
    /* NSFW : */
    NSFW_NO_CHANNEL_NSFW: "**:warning: | This is not an NSFW channel ! | :warning:**",
    NSFW_LOADING: "Please wait... <a:loading:675233191870595082>",
    NSFW_IMG_NO_CHARGING: ":underage:\n**[The image does not load? click here]",
    /* Musique : */
    SONGS: "musiques",
    MUSIC_CHANNEL_VOCAL: "<:X_:673212163837526064> | You must be in a voice channel!",
    MUSIC_NOTHING_PLAYING: "<:X_:673212163837526064> | There is nothing to play!",
    MUSIC_DISCONECTED: "<:X_:673212163837526064> | The music stopped because I was disconnected from the vocal channel!",
    MUSIC_CHANNEL_EMPTY: "<:X_:673212163837526064> | The music has stopped because there are no more members in the vocal channel!",
    MUSIC_NO_RESULTS: "<:X_:673212163837526064> | No results found on YouTube for {query} !",
    MUSIC_SEARCH_CANCEL: "<:X_:673212163837526064> | You did not provide a valid answer ... Please send the order again!",
    MUSIC_SEARCH_INVALIDE_RESPONSE: "<:X_:673212163837526064> | You must send a valid number between **1** and **{track}** !",
    MUSIC_TRACK_ADD: "<:check:673212026226737153> | {title} added to the queue !",
    /* Play : */
    PLAY_NO_REQUEST: "<:X_:673212163837526064> | Please enter a request to play the music!",
    PLAY_ALREADYPLAYMUSIC: "<:X_:673212163837526064> | I'm playing music on this server in another chat room, so join the voice channel I'm in to control the bot.",
    PLAY_ADD_QUEUE_1: "<:check:673212026226737153> | ",
    PLAY_ADD_QUEUE_2: " Added to the queue!",
    PLAY_PLAY: "🎶 | Playing in progress :\n",
    PLAY_QUEUE_END: "⚠️ | Queue over, add more songs to play!",
    PLAY_REPEAT: "🔁 | Repeat :\n ",
    PLAY_PLAYNOW: "🎶 | Play Now :\n ",
    PLAY_INTO: " dans ",
    PLAY_SEARCH_RESULTS: "Here are the results of your search for {query} :",
    /* Errors : */
    MUSIC_ERROR_1: "<:X_:673212163837526064> | No music is played on this server!",
    MUSIC_ERROR_2: "<:X_:673212163837526064> | You are not connected to any voice channel!",
    MUSIC_ERROR_3: "<:X_:673212163837526064> | I can't join your voice channel, please check my permissions!",
    MUSIC_ERROR_4: "<:X_:673212163837526064> | Something went wrong ... Error : {error}",
    /* Clear Queue : */
    CLEAR_QUEUE_CLEAR: "<:check:673212026226737153> | The queue is clear!",
    /* Loop : */
    LOOP_ACTIVATE: "<:check:673212026226737153> | Repeat mode disabled !",
    LOOP_DESACTIVATE: "🔁 | Repeat mode activated!",
    /* Now Playing : */
    NOW_PLAYING_NOW_PLAYING: "🎶 | Play Now  :\n",
    NOW_PLAYING_CHANNEL: "Channel :\n",
    NOW_REQUESTBY: "Requested by :",
    NOW_FORMPLAYLIST: "Comes from a playlist? :\n",
    NOW_PROGRESSBAR: "Progress bar :",
    /* Pause : */
    PAUSE_PAUSE: "⏸ | On break !",
    /* Resume : */
    RESUME_RESUME: "⏯️ | Takeover !",
    /* Skip : */
    SKIP_SKIP: "<:check:673212026226737153> | The current music has just been **jumped**.",
    /* Stop : */
    STOP_STOP: "⏹ | Disconnected !",
    /* Queue : */
    QUEUE_QUEUE_IN_PROGRESS: "In progress",
    QUEUE_SHUFFLE: "<:check:673212026226737153> | Mixed tail **{shu}** music(s)",
    QUEUE_REQUESTBY: "demandé par",
    QUEUE_NOQUEUE: "<:X_:673212163837526064> | No music in the queue.",
    /* Set Volume : */
    SET_VOLUME_NUMBER: "<:X_:673212163837526064> | Please enter a number!",
    SET_VOLUME_NUMBER_VALIDE: "<:X_:673212163837526064> | Please enter a valid number (between 1 and 100) !",
    SET_VOLUME_SUCESS: "<:check:673212026226737153> | Volume set to **{vol}%**!",
    /* Filtre : */
    FILTER_NO: "<:X_:673212163837526064> | Please specify a valid filter to enable or disable!",
    FILTER_NOT_EXIST: "<:X_:673212163837526064> | This filter does not exist!",
    FILTER_ADDED: "<:check:673212026226737153> | I add the filter to the music, please wait... \nNote: the longer the music is, the longer it will take!",
    FILTER_REMOVE: "<:check:673212026226737153> | I **disable** the filter on the music, please wait... \nNote: the longer the music is, the longer it will take!",
    FILTER_LIST: "List of all filters enabled or disabled. \nUse \`{prefix}filter\` to add a filter to a song.",
    /* Modération : */
    MOD_ACTION: "Action :",
    MOD_MEMBER: "Member :",
    MOD_MODERATOR: "Moderator :",
    MOD_REASON: "Reason :",
    MOD_TIME: "Time :",
    /* Ban : */
    SYNTAXE_BAN: "ban [Member] (Reason)```",
    BAN: "ban",
    AUTOBAN: "<:X_:673212163837526064> **Error :** You can't ban yourself!",
    BANYURA: "<:X_:673212163837526064> **Error :** You can't ban me!",
    BAN_NO_REASON: "No Reason provided.",
    BAN_ERROR: "<:X_:673212163837526064> **Error :** An error occurred, I couldn't ban it!",
    BAN_ERROR_1: "<:X_:673212163837526064> **Error:** I cannot banish this member because he has a role greater or equal to yours.",
    BAN_ERROR_2: "<:X_:673212163837526064> **Error:** I cannot banish this member because he has a higher or equal role to mine.",
    BAN_ERROR_INTERNE: "<:X_:673212163837526064> I cannot ban this member. My role may not be high enough or it is an internal error.",
    BAN_SUCESS_MPCLOSE: "<:check:673212026226737153> I did banish him but I couldn't warn him.",
    BAN_SUCESS_1: "<:X_:673212163837526064> You have been banned on **",
    BAN_SUCESS_2: "** by __",
    BAN_SUCESS_3: "__ for the reason **",
    /* Unban : */
    SYNTAXE_UNBAN: "unban [Member] (Reason)```",
    UNBAN: "unban",
    UNBAN_NOBAN: "<:X_:673212163837526064> | **{name}** is not banned !",
    UNBAN_INVALIDE_ID: "<:X_:673212163837526064> | Unable to find the member! Check that you have entered a member id.",
    UNBAN_SUCESS_1: "<:check:673212026226737153> You have been unbanned on **",
    UNBAN_SUCESS_2: "** by __",
    UNBAN_SUCESS_3: "__ for the reason **",
    UNBAN_SUCESS_MPCLOSE: "<:check:673212026226737153> I did unbanish him, but I couldn't warn him.",
    /* Commande Clear : */
    CLEAR_LIMIT: "<:X_:673212163837526064> **Please give a number between 1 and 100 to make this command.**",
    CLEAR_14DAYS: "<:X_:673212163837526064> **Error :** The bot can't delete 14 days old messages!",
    DELETE_MESSAGE: "deleted messages.**",
    CLEAR: "clear",
    /* Commande Kick : */
    SYNTAXE_KICK: "kick [Member] (Reason)```",
    AUTOKICK: "<:X_:673212163837526064> **Error :** You can't kick yourself!",
    KICKYURA: "<:X_:673212163837526064> **Error :** You can't kick me!",
    KICK_DEV: "You can't kick my Developer!",
    KICK: "kick",
    KICK_ERROR_1: "<:X_:673212163837526064> **Error:** I can't kick this member out because he has a role greater or equal to yours.",
    KICK_ERROR_2: "<:X_:673212163837526064> **Error:** I can't kick this member out because he has a higher or equal role to mine.",
    KICK_ERROR_INTERNE: "<:X_:673212163837526064> I cannot kick this member out. My role may not be high enough or it is an internal error.",
    KICK_ERROR: "<:X_:673212163837526064> **Error :** A mistake happened, I couldn't kick it!",
    KICK_SUCESS_MPCLOSE: "<:check:673212026226737153> I did kick him out but I couldn't warn him.",
    KICK_SUCESS_1: "<:X_:673212163837526064> You have been kicked out on **",
    KICK_SUCESS_2: "** by __",
    KICK_SUCESS_3: "__ for the reason **",
    /* Commande Lock : */
    LOCK: "lock",
    LOCK_MESSAGE_1: "<:check:673212026226737153> **",
    LOCK_MESSAGE_2: "** has just locked the channel. Don't worry, the administrator will soon reopen the chat, so be patient.",
    LOCK_ALREADYLOCKED: "<:X_:673212163837526064> **Error :** This salon is already locked!",
    /* Commande UnLock : */
    UNLOCK: "unlock",
    UNLOCK_MESSAGE: "<:check:673212026226737153> Lock up, have fun talking while you can!",
    UNLOCK_NOLOCKED: "<:X_:673212163837526064> **Error :** This salon is not locked!",
    /* Commande TimeLock : */
    TIMELOCK: "timelock",
    TIMELOCK_ERROR_TIME: "<:X_:673212163837526064> **Error :** You must set a time for the lock in hours, minutes or seconds!",
    /* Commande Warn : */
    SYNTAXE_WARN: "warn [Member] [Reason]```",
    WARN: "warn",
    WARN_MESSAGE_SUCESS_1: ":warning: | The user **",
    WARN_MESSAGE_SUCESS_2: "** just received a warning from **",
    WARN_MESSAGE_SUCESS_3: "** for the following reason : **",
    WARN_MESSAGE_USER_1: ":warning: | You have received a warning in the server **",
    WARN_MESSAGE_USER_2: "** by ",
    WARN_MESSAGE_USER_3: " for the following reason : **",
    /* Commande Mute : */
    SYNTAXE_MUTE: "mute [Member] (Reason)```",
    MUTE: "mute",
    AUTOMUTE: "<:X_:673212163837526064> **Error:** You can't mute yourself!",
    USERMUTE: "<:X_:673212163837526064> **Error:** The given user is already muted!",
    MUTE_ERROR: "<:X_:673212163837526064> **Error :** An error occurred, I couldn't mute it!",
    MUTE_SUCESS_MP_1: "🔇 You've been mute on **",
    MUTE_SUCESS_MP_2: "** by __",
    MUTE_SUCESS_MP_3: "__ during ",
    MUTE_SUCESS_MP_4: "For the reason ",
    MUTE_SUCESS_MPCLOSE: "<:check:673212026226737153> I mutated him well but I couldn't warn him.",
    /* Commande UnMute : */
    SYNTAXE_UNMUTE: "unmute [Member]```",
    UNMUTE: "unmute",
    UNMUTE_NOMUTE: "<:X_:673212163837526064> **Error:** This member is not mute!",
    UNMUTE_SUCESS: "<:check:673212026226737153> | **{usermute}** is unmute !",
    UNMUTE_SUCESS_MPCLOSE: "<:check:673212026226737153> I had a mute, but I couldn't warn him.",
    UNMUTE_SENDUSER: "<:check:673212026226737153> | You are unmute on **{guild}**",
    UNMUTE_ERROR: "<:X_:673212163837526064> **Error:** An error occurred, I couldn't get the unmute!",
    /* Commande TempMute : */
    SYNTAXE_TEMPMUTE: "tempmute [member] [Time] (Reason)```",
    TEMPMUTE: "tempmute",
    TEMPMUTE_SUCESS_MP_1: "🔇 You are muted on **",
    TEMPMUTE_SUCESS_MP_2: "** by __",
    TEMPMUTE_SUCESS_MP_3: "__ during ",
    TEMPMUTE_SUCESS_MP_4: "For the reason ",
    TEMPMUTE_SUCESS_MPCLOSE: "<:check:673212026226737153> I had a mute, but I couldn't warn him.",
    TEMPMUTE_UNMUTE_CHANNEL_1: "<:check:673212026226737153> The member <@",
    TEMPMUTE_UNMUTE_CHANNEL_2: "> has been unmute!",
    TEMPMUTE_UNMUTE_MP_1: "🔊 You are unmute on **",
    TEMPMUTE_UNMUTE_MP_2: "** ! You can talk!",
    /* Commande Everyrole : */
    SYNTAXE_EVERYROLE: "everyrole [Role]```",
    EVERYROLE: "everyrole",
    EVERYROLE_MENTION: "<:X_:673212163837526064> **Error :** Please mention a role!",
    EVERYROLE_NO_ROLEFOUND: "<:X_:673212163837526064> | No roles found for **{role}**.",
    EVERYROLE_SUCESS: "<:check:673212026226737153> | I have added the role **{role}** to **everyone**.",
    /* Utilitaire : */
    ONLINE: "",
    OFFLINE: "",
    DND: "<:dnd:675371548651159573> Do not disturb",
    IDLE: "",
    /* Commande ascii : */
    SYNTAXE_ASCII: "ascii [Message]```",
    ASCII: "ascii",
    ASCII_ERROR: "Error:",
    ASCII_LIMIT_MESSAGE: "Only 20 characters are allowed.",
    /* Commande Calc : */
    SYNTAXE_CALC: "calc [operation]```",
    CALC: "calc",
    CALC_ERROR: "**<:X_:673212163837526064> Error :** Check your operation !",
    CALC_SUCESS: "```Result :\n\n",
    /* Commande Cooldown : */
    SYNTAXE_COOLDOWN: "cooldown [Time]```",
    COOLDOWN: "cooldown",
    COOLDOWN_SUCESS: ":alarm_clock: | Cooldown enabled on **",
    COOLDOWN_END: "** !",
    COOLDOWN_STOP: ":alarm_clock: | Time expired! It happened **",
    /* Commande Embed : */
    SYNTAXE_EMBED: "embed [Color] | [Title] | [Description] | [Footer]```",
    EMBED: "embed",
    EMBED_SUCESS: "```Result :\n\n",
    /* Commande Emojis : */
    EMOJIS_TITLE: "__**<:smiling:675373017005686836> Emojis on the server :**__",
    EMOJIS: "emojis",
    /* Commande Report-bug : */
    SYNTAXE_REPORT_BUG: "report-bug [Description]```",
    REPORT_BUG: "report-bug",
    /* Commande web-ping : */
    SYNTAXE_WEB_PING: "web-ping [Web Site]```",
    WEB_PING: "web-ping",
    WEB_PING_NOSITEFOUND: "<:X_:673212163837526064> **Error : Site not found!**",
    WEB_PING_TITLE: "<:processor:675368071497515034> Informations for {site}",
    WEB_PING_OWNER: ":bust_in_silhouette: Owner :",
    WEB_PING_ORGANISATION: "**Organisation :**",
    WEB_PING_INTERNET: "**Internet Service Provider :**",
    WEB_PING_LOCATION: ":earth_africa: Location :",
    WEB_PING_COUNTRY: "**Country :**",
    WEB_PING_CITY: "**City :**",
    WEB_PING_OTHER: ":zap: Other :",
    WEB_PING_MOBILE: "**Mobile :**",
    WEB_PING_PROXY: "**Proxy :**",
    WEB_PING_HOSTING: "**Hosting:**",
    /* Commande Weather : */
    SYNTAXE_WEATHER: "weather [City/Region]```",
    WEATHER: "weather",
    WEATHER_SUCESS: "🌦️ Weather for : {city}",
    /* Commande Finduser : */
    SYNTAXE_FINDUSER: "finduser [User ID]```",
    FINDUSER: "finduser",
    FINDUSER_ERROR: "**<:X_:673212163837526064> Error :** Verify that it is an id !",
    DISCRIMINATOR: "#️⃣ » Discriminator : #",
    CREATED_AT: "📆 » Created on : ",
    LAST_MSG: "#️⃣ » last message : ",
    /* Commande Hastebin : */
    SYNTAXE_HASTEBIN: "hastebin [Your Code]```",
    HASTEBIN: "hastebin",
    HASTEBIN_SUCESS: "`Published on Hastebin at this URL : `  ",
    HASTEBIN_ERROR: "**<:X_:673212163837526064> Error :** Hastebin is offline, please try again later.",
    /* Commande INVITE : */
    INVITE: "invite",
    INVITE_TITLE: "🔧 Add Yura on your discord server!",
    INVITE_ADMIN: "__**Invitation link with administrator permissions :**__",
    INVITE_PERSO: "__**Invitation link with permissions that you can customize:**__",
    INVITE_CLICK_HERE: "**Click here**",
    /* Commande Shorten : */
    SYNTAXE_SHORTEN: "shorten [Link]```",
    SHORTEN: "shorten",
    SHORTEN_SUCESS: "`Shortcut link to this URL : `  ",
    /* Commande Morse : */
    SYNTAXE_MORSE: "morse [Text]```",
    MORSE: "morse",
    MORSE_SUCESS: "<:check:673212026226737153> **__Result :\n\n__**",
    /* Commande BotInfo : */
    BOTINFO: "botinfo",
    BOTINFO_TITLE: "**• Bot information •**",
    BOTINFO_CREATOR: "👑 Creator →",
    BOTINFO_UPTIME: "⏲ Uptime →",
    BOTINFO_INFOS: "📰 Information →",
    BOTINFO_STATS: "📊 Statistics →",
    BOTINFO_STATS_SERVERS: "- `Servers` → ",
    BOTINFO_STATS_USERS: "- `Users` → ",
    BOTINFO_STATS_CHANNELS: "- `Channels` → ",
    BOTINFO_STATS_PING: "- `Discord Ping` → ",
    BOTINFO_VERSION: ":robot: • __Versions__",
    BOTINFO_SYSTEM: ":gear: • __System__",
    BOTINFO_LINKS: "🔗 • __Links__ →",
    BOTINFO_LINKS_INVITEBOT: "Invite the bot",
    BOTINFO_LINKS_SUPPORT: "Server Support",
    /* Commande QRCODE : */
    SYNTAXE_QRCODE: "qrcode [Link]```",
    QRCODE: "qrcode",
    QRCODE_DESC: "Here is the qrcode for : ",
    QRCODE_ERROR: "<:X_:673212163837526064> **Error :** Please put a link !",
    /* Commande SERVERINFO : */
    SERVERINFO: "serverinfo",
    SERVERINFO_NO_ROLES: "None",
    SERVERINFO_NAME: "🎟️ Name ➜",
    SERVERINFO_CREATION: "🎂 Created on ➜",
    SERVERINFO_ID: "<:ID:729291914783752192> ID ➜",
    SERVERINFO_PROPRIETAIRE: "👑 Owner :",
    SERVERINFO_REGION: "<:card:729291679038701578> Region ➜",
    SERVERINFO_USERS: "<:member:729291783602831410> Users ➜",
    SERVERINFO_BOT: "<:bot:675366957687504930> Bot(s) ➜",
    SERVERINFO_AFK: ":zzz: Inactivity time ➜",
    SERVERINFO_ROLES: "<:role:729295590730760195> Roles ➜",
    SERVERINFO_CHANNELS: "<:channel:729291851601018961> Channels ➜",
    SERVERINFO_EMOJIS: "<:emoji:729291695241429022> Emojis ➜",
    SERVERINFO_VERIFICATION: "<:RCP:729295624822063144> Level of verification ➜",
    SERVERINFO_STATS: "<:horizontalsettingsmixer:675372744950677534> Statistics ➜",
    SERVERINFO_STATS_ONLINE: "↳ <:online:675371850905157653> Online : ",
    SERVERINFO_STATS_STREAM: "\n↳ <:stream:729302786994470932> In Streaming : ",
    SERVERINFO_STATS_AFK: "\n↳ <:idle:675371429264359424> AFK : ",
    SERVERINFO_STATS_DND: "\n↳ <:dnd:675371548651159573> Do not disturb : ",
    SERVERINFO_STATS_OFFLINE: "\n↳ <:offline:675371685792186409> Offline : ",
    /* Commande userinfo : */
    SYNTAXE_USERINFO: "userinfo <none|@user|id>```",
    USERINFO: "userinfo",
    USERINFO_USERS: "User statistics **",
    USERINFO_PSEUDO: "**<:member:729291783602831410> Username ➜**",
    USERINFO_TAG: "**<:channel:729291851601018961> Tag ➜**",
    USERINFO_SURNOM: "**<:emoji:729291695241429022> Nickname ➜**",
    USERINFO_ID: "**<:ID:729291914783752192> Id ➜**",
    USERINFO_ARIVATEDATE: "**💨 Date of arrival on ",
    USERINFO_CREATEDAT: "**💫 Account creation date ➜**",
    USERINFO_LASTMSG: "**📨 Last message ➜**",
    USERINFO_GAME: "**🕹 Game ➜**",
    USERINFO_NO_GAME: "No game",
    USERINFO_STATUS: "**🔆 Status ➜**",
    USERINFO_INFOS: "User Information ",
    /* Commande SUGGEST : */
    SYNTAXE_SUGGEST: "suggest [Description]```",
    SUGGEST: "suggest",
    SUGGEST_ERROR_NO_SYSTEM: "<:X_:673212163837526064> | You have not activated the suggestion system on your server!",
    SUGGEST_ERROR_NO_CHANNEL: "<:X_:673212163837526064> | The channel was not found!",
    SUGGEST_ERROR: "<:X_:673212163837526064> **Error :** An error occurred the suggestion was not sent!",
    SUGGEST_TITLE: "New suggestion!",
    SUGGEST_AUTHOR: "💼 __Author :__",
    SUGGEST_DESC: "📝 __Description :__",
    SUGGEST_SUCESS: "<:check:673212026226737153> Your suggestion has just been sent!",
    /* Commande SUPPORT : */
    SUPPORT: "support",
    SUPPORT_DESC: "🔧 Join the Yura Bot support server",
    SUPPORT_FIELD: "**__Here is our support discord server to help you or propose new features :__**",
    /* Commande SYSTEMINFO : */
    SYSTEMINFO: "systeminfo",
    SYSTEMINFO_SYSTEM: ":gear: • __System__",
    SYSTEMINFO_PLATEFORM: "Platform : ",
    SYSTEMINFO_CPU: "💻 • __Processor__",
    SYSTEMINFO_PING: "MB` | Latency with API : ",
    /* Games : */
    /* Commande mc-server : */
    SYNTAXE_MC_SERVER: "mc-server [server]```",
    ONLINE: "Online",
    OFFLINE: "Offline",
    MC_SERVER_ONLINE_PLAYER: "<:minecraftsword:675369153833467930> » Online Players : ",
    MC_SERVER: "mc-server",
    MC_SERVER_NO_FOUND: "**<:X_:673212163837526064> Error :** No server found, please try again.",
    /* Commande mc-achivements : */
    SYNTAXE_MC_ACHIVEMENT: "mc-achivements | [block] | [title] | [description1] | (description2)```",
    MC_ACHIVEMENT: "mc-achivements",
    MC_ACHIVEMENT_ERROR: "**<:X_:673212163837526064> Error :** Please check that your sentences are not too long and that the block is valid.",
    /* Commande mc-user : */
    SYNTAXE_MC_USER: "mc-user [Pseudo]```",
    MC_USER_NAME: "<:idverified:675370524825747486> » Name : ",
    MC_USER_GET_HEAD: "<:smiling:675373017005686836> » Order to get the head : ",
    MC_USER: "mc-user",
    MC_USER_NO_FOUND: "**<:X_:673212163837526064> Error :** No users found, please try again.",
    /* Commande Rockstar Status : */
    RGS_TITLE: "<:rockstar:777553264882352188> Status of rockstar games : ",
    RGS_ONLINE: " Online !",
    RGS_OFFLINE: " Offline !",
    /* Ticket : */
    TICKET_TITLE: "Ticket System",
    TICKET_DESC: "React with 🎟️ to create a ticket.",
    TICKET_OPEN_TITLE: "📝 | Open Ticket",
    TICKET_OPEN_DESC: "We have just opened your ticket with support.\n",
    TICKET_CHANNEL_TITLE: "Ticket opened by : {user}\n",
    TICKET_CHANNEL_DESC_1: "Hello **{user}**, \n",
    TICKET_CHANNEL_DESC_2: "Under the name : **{ticketName}**.",
    TICKET_CHANNEL_FIELD_1: ":bar_chart: User Information :",
    TICKET_CHANNEL_FIELD_2: ":clipboard: User ID :",
    TICKET_CLOSE_TITLE: "📥 | Ticket Closed",
    TICKET_CLOSE_DESC: "You have just closed the request!",
    TICKET_ERROR: "**<:X_:673212163837526064> Erreur :** An error occurred with the ticket system please try again!",
    /* Reaction Roles : */
    RR_ROLE_ERROR_FETCH_MSG: "**<:X_:673212163837526064> Erreur Reaction Roles :** The message is not found, please re-setup the reaction role !",
    RR_ROLE_NO_FOUND: "**<:X_:673212163837526064> Erreur Reaction Roles :** The role is untraceable or it is below the role of the Bot !",
    RR_ROLE_MEMBER_ADMIN: "**<:X_:673212163837526064> Erreur Reaction Roles :** You outrank me, so I can't give/remove you a role !",
};

const translate = (key, ...args) => {
    const translation = languageData[key]; 
    if(typeof translation === "function") return translation(args);
    else return translation;
};

module.exports = translate;