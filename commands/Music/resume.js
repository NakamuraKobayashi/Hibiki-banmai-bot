const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "resume",
  aliases: ["restart", "back", "tiếp-tục", "tt"],
  category: "music",
  description: "Tiếp tục phát nhạc!",
  usage: "resume",
  run: async (client, message, args) => {
    
    const Channel = message.member.voice.channel;
    
    if (!Channel) return message.channel.send("Hãy vào trong voice trước để tiếp tục phát!");
    
    const Queue = await client.queue.get(message.guild.id);
    
    if (!Queue) return message.channel.send("Không có bài nào đang phát, thêm một vài bài hát vui nhộn vào đi nào :D");
   
    if (Queue.Playing) return message.channel.send("<:puddingangry:864826668577193994> Nhạc đang phát rồi mà");
    
    Queue.Playing = true;
    Queue.Bot.dispatcher.resume();
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Thành Công")
    .setDescription("🎶 Nhạc được tiếp tục phát!")
    .setTimestamp();
    
    return message.channel.send(Embed).catch(() => message.channel.send("🎶 Nhạc được tiếp tục phát!"));
  }
};