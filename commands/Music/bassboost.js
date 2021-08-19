const { Default_Prefix, Color } = require("../../config.js");
const { Player } = require("../../Functions.js")
const Discord = require("discord.js"), Ytdl = require("discord-ytdl-core"), db = require("quick.db");

module.exports = {
  name: "bassboost",
  aliases: ["bb"],
  category: "music",
  description: "Bật hoặc Tắt bassboost!",
  usage: "bassboost",
  run: async (client, message, args) => {
    const Channel = message.member.voice.channel;

    if (!Channel) return message.channel.send("Bạn phải ở trong Voice!");

    const Queue = await client.queue.get(message.guild.id);

    if (!Queue)
      return message.channel.send(
        "Không có bài nào đang phát cả :D"
      );

    const Embed = new Discord.MessageEmbed()
      .setColor(Color)
      .setTitle("Thành công")
      .setDescription(`🎶 Bassboost đã được ${Queue.Filters["bassboost"] ? "Tắt" : "Bật"}`)
      .setTimestamp();
    
    Queue.Filters["bassboost"] = Queue.Filters["bassboost"] ? false : true;
    
    await Player(message, Discord, client, Ytdl, { Filter: true, Play: Queue.Songs[0], Color: Color, db: db });

    return message.channel.send(Embed).catch(() => message.channel.send(`🎶 Bassboost đã được ${Queue.Filters["bassboost"] ? "Tắt" : "Bật"}`));
    
  }
};