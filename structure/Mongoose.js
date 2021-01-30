const mongoose = require("mongoose");
const { mongoKey } = require("../configs/config.json")
const { Guild, User } = require("../models/index")

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