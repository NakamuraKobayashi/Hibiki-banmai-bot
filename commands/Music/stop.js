const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "stop",
  aliases: ["end", "fuckoff"],
  category: "music",
  description: "Dừng nhạc và thoát voice!",
  usage: "stop",
  run: async (client, message, args) => {
    
    const Channel = message.member.voice.channel;
    
    if (!Channel) return message.channel.send("Hãy vào trong voice trước !");
    
    const Queue = await client.queue.get(message.guild.id);
    
    if (!Queue) return message.channel.send("Không có bài nào đang phát để dừng cả !");
       
    Queue.Songs = [];
    await Queue.Bot.dispatcher.end();
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Thành công")
    .setDescription("🎶 Đã dừng phát nhạc!")
    .setTimestamp();
    
    return message.channel.send(Embed).catch(() => message.channel.send("🎶 Đã dừng phát nhạc!"));
  }
};