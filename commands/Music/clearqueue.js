const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "clearqueue",
  aliases: ["cq"],
  category: "music",
  description: "Xóa tất cả các bài trong hàng chờ!",
  usage: "clearqueue",
  run: async (client, message, args) => {
    
    const Channel = message.member.voice.channel;
    
    if (!Channel) return message.channel.send("Bạn phải ở trong Voice!");
    
    const Queue = await client.queue.get(message.guild.id);
    
    if (!Queue) return message.channel.send("Không có bài nào đang phát cả, hãy thêm bài hát vào hàng chờ :D");
       
    Queue.Songs = [];
    await Queue.Bot.dispatcher.end();
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Thành công")
    .setDescription("🎶 Danh sách phát đã được xóa!")
    .setTimestamp();
    
    return message.channel.send(Embed).catch(() => message.channel.send("🎶 Danh sách phát đã được xóa!"));
  }
};