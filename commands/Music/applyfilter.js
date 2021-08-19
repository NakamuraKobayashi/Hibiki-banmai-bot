const { Default_Prefix, Color } = require("../../config.js");
const { Player } = require("../../Functions.js")
const Discord = require("discord.js"), Ytdl = require("discord-ytdl-core"), db = require("quick.db");

module.exports = {
  name: "applyfilter",
  aliases: ["af"],
  category: "music",
  args: true,
  description: "Bật hoặc tắt Filter!",
  usage: "applyfilter <Filter>",
  run: async (client, message, args) => {
    const Channel = message.member.voice.channel;

    if (!Channel) return message.channel.send("Bạn phải ở trong Voice!");

    const Queue = await client.queue.get(message.guild.id);

    if (!Queue)
      return message.channel.send(
        "Không có bài nào đang phát cả, hãy thêm một bài nào đó vào hàng chờ :D"
      );
    
    let Filter = args[0];
    
    const Filters = ["nightcore", "bassboost", "vaporwave", "phaser", "treble", "normalizer", "flanger"];
    
    if (!Filter) return message.channel.send("Hãy chọn một filter - " + Filters.map(fil => fil.charAt(0).toUpperCase() + fil.slice(1)).join(", "));
    
    if (!Filters.find(Fil => Fil === Filter.toLowerCase())) return message.channel.send("Không tìm thấy filter đó - " + Filter.charAt(0).toUpperCase() + Filter.slice(1));
    
    const Embed = new Discord.MessageEmbed()
      .setColor(Color)
      .setTitle("Thành Công")
      .setDescription(`🎶 ${Filter.charAt(0).toUpperCase() + Filter.slice(1)} Đã được ${Queue.Filters[Filter] ? "Tắt" : "Bật"}`)
      .setTimestamp();
    
    Filter = Filter.toLowerCase();
    
    Queue.Filters[Filter] = await Queue.Filters[Filter] ? false : true;
    
    await Player(message, Discord, client, Ytdl, { Filter: true, Play: Queue.Songs[0], Color: Color }, db);

    return message.channel.send(Embed).catch(() => message.channel.send(`🎶 ${Filter.charAt(0).toUpperCase() + Filter.slice(1)} Đã được ${Queue.Filters[Filter] ? "Tắt" : "Bật"}`));
    
  }
};