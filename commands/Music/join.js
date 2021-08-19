const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");

module.exports = {
  name: "join",
  aliases: ["come"],
  category: "music",
  description: "Gọi bot vào Voice!",
  usage: "Join",
  run: async (client, message, args) => {
    
    const Channel = message.member.voice.channel;
    
    if (!Channel) return message.channel.send("Hãy vào trong voice!");
    
    if (!Channel.joinable) return message.channel.send("Tôi không thể vào voice!");
    
    await Channel.join().catch(() => {
      return message.channel.send("Không thể vào voice này!");
    });
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Thành Công")
    .setDescription("🎶 Đã vào voice, dùng lệnh play để phát nhạc!")
    .setTimestamp();
    
    return message.channel.send(Embed).catch(() => message.channel.send("🎶 Đã vào voice, dùng lệnh play để phát nhạc!"));
  }
};