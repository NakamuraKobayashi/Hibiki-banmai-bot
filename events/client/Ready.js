const fs = require("fs");
const mongoose = require("mongoose");
let { mongodb, Default_Prefix, url_uptime } = require("../../config.js");
let fetch = require("node-fetch");
let Discord = require("discord.js");
let MessageEmbed = Discord.MessageEmbed;

module.exports = async client => {
  client.on("ready", async () => {
    await mongoose.connect(mongodb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    let users = 0;
    client.guilds.cache.forEach(x => {
      users += x.memberCount;
    });
    console.clear();
    console.log(`Bot Is Ready To Go!\nTag: ${client.user.tag}`);
    client.user
      .setPresence({
        activity: {
          type: "PLAYING",
          name: `${Default_Prefix}help | @mention help | ${users} Nguời Dùng | ${client.guilds.cache.size} Máy Chủ`
        },
        status: "online"
      })
      .then(console.log)
      .catch(console.error);

 
    require("../../handlers/Slash-ready.js")(client)
  });

  mongoose.connection.on("connected", () => {
    console.log("Đã kết nối đến Mongoose!");
  });
  
  mongoose.connection.on("err", err => {
    console.error(`Lỗi kết nối với Mongoose: \n${err.stack}`);
  });
  
  mongoose.connection.on("disconnected", () => {
    console.warn("Mất kết nối với Mongoose!");
  });
  setInterval(async () => {
    await fetch(url_uptime);
  }, 2400);
};

