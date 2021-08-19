const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");

module.exports = {
  name: "loop",
  aliases: ["lp"],
  category: "music",
  description: "hiển thị loop đang bật hay tắt, hoặc bật tắt loop XD",
  usage: "Loop | <bật hoặc tắt>",
  run: async (client, message, args) => {
    
    const Channel = message.member.voice.channel;
    
    if (!Channel) return message.channel.send("Hãy vào trong voice!");
    
    const Queue = await client.queue.get(message.guild.id);
    
    if (!Queue) return message.channel.send("Không có bài nào đang phát cả, hãy thêm một vài bài vào hàng chờ :D");
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Trạng Thái Loop")
    .setDescription(`🎶 Trạng Thái Loop - ${Queue.Loop ? "Bật" : "Tắt"}`)
    .setTimestamp();
    
    if (!args[0]) return message.channel.send(Embed);
    
    const Settings = ["bật", "tắt"];
    
    if (!Settings.find(Set => Set === args[0].toLowerCase())) return message.channel.send("Invalid Option Provided - On , Off");
    
    const Status = Queue.Loop ? "bật" : "tắt";
    
    args[0] = args[0].toLowerCase();
    
    if (args[0] === Status) return message.channel.send(`Loop đã ${Queue.Loop ? "bật" : "tắt"} từ trước rồi!`);
    
    const Embeded = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Thành Công")
    .setTimestamp();
    
    if (args[0] === "on") {
      Queue.Loop = true;
      Embeded.setDescription("🎶 Đã bật chế lộ Loop (lặp lại)!")
      return message.channel.send(Embeded).catch(() => message.channel.send("Đã bật chế lộ Loop!"))
    } else {
      Queue.Loop = false;
      Embeded.setDescription("🎶 Đã tắt chế lộ Loop (lặp lại)!");
      return message.channel.send(Embeded).catch(() => message.channel.send("Đã tắt chế lộ Loop!"));
    };
  }
};