const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "skip",
  aliases: ["next", "s"],
  category: "music",
  description: "Bỏ qua bài hát đang phát!",
  usage: "skip",
  run: async (client, message, args) => {
    
    const Channel = message.member.voice.channel;
    
    if (!Channel) return message.channel.send("Hãy vào trong Voice trước để Skip!");
    
    const Queue = await client.queue.get(message.guild.id);
    
    if (!Queue) return message.channel.send("Không có bài nào đang phát để Skip đâu!");
    
    if (!Queue.Playing) Queue.Playing = true;
    
    Queue.Bot.dispatcher.end();
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Thành công")
    .setDescription("🎶 Đã bỏ qua bài hát!")
    .setTimestamp();
    
    return message.channel.send(Embed).catch(() => message.channel.send("🎶 Đã bỏ qua bài hát!"));
  }
};