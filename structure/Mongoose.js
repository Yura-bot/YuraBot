const mongoose = require("mongoose");
const { mongoKey } = require("../configs/config.json")
const { Guild } = require("../models/index")

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

    await guildDB.save().catch(err => console.log(err));
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
      await guildDB.save().catch(err => console.log(err));
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