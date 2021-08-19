const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");

module.exports = {
  name: "leave",
  aliases: ["goaway", "disconnect"],
  category: "music",
  description: "Thoát ra khỏi voice!",
  usage: "Leave",
  run: async (client, message, args) => {
    
    const Channel = message.member.voice.channel;
    
    if (!Channel) return message.channel.send("Hãy ở trong kênh Voice!");
    
    if (!message.guild.me.voice) return message.channel.send("Tôi không ở trong kênh Voice nào cả!");
    
    try {
    
    await Channel.leave();
      
    } catch (error) {
      await  Channel.leave();
      return message.channel.send("Đang cố thoát khỏi voice...");
    };
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Thành công")
    .setDescription("🎶 Đã thoát khỏi voice :C")
    .setTimestamp();
    
    return message.channel.send(Embed).catch(() => message.channel.send("🎶 Đã thoát khỏi voice :C"));
  }
};