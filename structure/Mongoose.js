const mongoose = require("mongoose");
const { mongoKey } = require("../configs/config.json")
const { Guild, User, Reaction_Roles, Giveaway } = require("../models/index")

module.exports = {
    init: () => {
        const mongOptions = { useNewUrlParser: true, useUnifiedTopology: true }

        mongoose.connect(mongoKey, mongOptions).then(() => {
            console.log("• Mongoose connecté !")
        }).catch((err) => {
            console.log("• Error Mongoose ! "+err)
        });
    }
}

module.exports.createGuild = async function (guildID){
    guildDB = new Guild({
      _id: mongoose.Types.ObjectId(),
      id: guildID
    })

    await guildDB.save();
    return true;
};

module.exports.getGuild = async function (guildID){

    let guildDB = await Guild.findOne( { id: guildID } );
  
    if(guildDB){
      return guildDB;
    } else {
      guildDB = new Guild({
        _id: mongoose.Types.ObjectId(),
        id: guildID
      })
      await guildDB.save();
      return guildDB;
    }
};

module.exports.deleteGuild = async function (guildID){

  let guildDB = await Guild.findOne( { id: guildID } );

  if(guildDB){
    await Guild.deleteOne({ id: guildID });
    return true;
  } else {
    return false;
  }
};

module.exports.getUser = async function (userID){

  let UserDB = await User.findOne( { id: userID } );
  
  if (UserDB) {
    return UserDB;
  } else {
    return false;
  }
};

module.exports.getUserTag = async function (tag){

  let UserDB = await User.findOne( { tag: tag } );
  
  if (UserDB) {
    return UserDB;
  } else {
    return false;
  }
};

module.exports.createUser = async function (userID){
  UserDB = new User({
    _id: mongoose.Types.ObjectId(),
    id: userID
  })

  await UserDB.save();
  return true;
};

module.exports.getReactionRoles = async function (messageID, guildID){
  let reactRoles;
  if (messageID) reactRoles = await Reaction_Roles.findOne( { messageId: messageID } );
  else if (guildID) reactRoles = await Reaction_Roles.find( { guildId: guildID } );

  if(reactRoles){
    return reactRoles;
  } else {
    return false
  }
};

module.exports.createReactionRoles = async function (messageID, guildID, pro, data){
  reactRoles = new Reaction_Roles({
    _id: mongoose.Types.ObjectId(),
    messageId: messageID,
    guildId: guildID,
    pro: pro,
    data: data
  })

  await reactRoles.save();
  return true;
};

module.exports.deleteReactionRoles = async function (messageID, guildID){
  let reactRoles;
  if (messageID) reactRoles = await Reaction_Roles.deleteOne({ messageId: messageID });
  else if (guildID) reactRoles = await Reaction_Roles.deleteMany({ guildId: guildID });

  if(reactRoles){
    return true;
  } else {
    return false;
  }
};