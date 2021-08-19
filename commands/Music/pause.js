const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "pause",
  aliases: ["wait","tạm-dừng"],
  category: "music",
  description: "Tạm dừng phát nhạc!",
  usage: "Pause",
  run: async (client, message, args) => {
    
    const Channel = message.member.voice.channel;
    
    if (!Channel) return message.channel.send("Hãy vào voice để tạm dừng!");
    
    const Queue = await client.queue.get(message.guild.id);
    
    if (!Queue) return message.channel.send("Không có bài nào đang phát để tạm dừng đou bạn :D");
   
    if (!Queue.Playing) return message.channel.send("🎶 Nhạc đang dừng rồi, không phải dừng lần nữa đou bạn <:puddingannounce:865067836224700437>");
    
    Queue.Playing = false;
    Queue.Bot.dispatcher.pause();
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Thành Công")
    .setDescription("🎶 Đã tạm dừng phát nhạc!")
    .setTimestamp();
    
    return message.channel.send(Embed).catch(() => message.channel.send("🎶 Đã tạm dừng phát nhạc!"));
  }
};