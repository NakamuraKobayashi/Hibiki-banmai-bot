const { Default_Prefix, Color } = require("../../config.js");
const { Player } = require("../../Functions.js")
const Discord = require("discord.js"), Ytdl = require("discord-ytdl-core"), db = require("quick.db");

module.exports = {
  name: "nightcore",
  aliases: [],
  category: "music",
  description: "Mở hoặc tắt Nightcore!",
  usage: "Nightcore",
  run: async (client, message, args) => {
    const Channel = message.member.voice.channel;

    if (!Channel) return message.channel.send("Hãy vào trong voice trước :3!");

    const Queue = await client.queue.get(message.guild.id);

    if (!Queue)
      return message.channel.send(
        "Không có bài nào đang phát, hãy thêm một vài bài vào hàng chờ đi bạn ưi :D"
      );

    const Embed = new Discord.MessageEmbed()
      .setColor(Color)
      .setTitle("Thành Công")
      .setDescription(`🎶 Nightcore đã được ${Queue.Filters["nightcore"] ? "Tắt" : "Bật"}`)
      .setTimestamp();
    
    Queue.Filters["nightcore"] = Queue.Filters["nightcore"] ? false : true;
    
    await Player(message, Discord, client, Ytdl, { Filter: true, Play: Queue.Songs[0], Color: Color }, db);

    return message.channel.send(Embed).catch(() => message.channel.send(`🎶 Nightcore đã được ${Queue.Filters["nightcore"] ? "Tắt" : "Bật"}`));
    
  }
};