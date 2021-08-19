const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "shuffle",
  aliases: ["sf", "shufflequeue"],
  category: "music",
  description: "Phát ngẫu nhiên các bài trong danh sách phát!",
  usage: "Queue",
  run: async (client, message, args) => {
    const Channel = message.member.voice.channel;

    if (!Channel) return message.channel.send("Hãy vào trong voice trước!");

    const Queue = await client.queue.get(message.guild.id);

    if (!Queue)
      return message.channel.send(
        "Không có bài nào đang phát cả, hãy thêm một vài bài vào danh sách phát :D"
      );
    
    const Current = await Queue.Songs.shift();
    
    Queue.Songs = Queue.Songs.sort(() => Math.random() - 0.5);
    await Queue.Songs.unshift(Current);
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Thành công")
    .setDescription("🎶 Danh sách phát sẽ được phát ngẫu nhiên")
    .setTimestamp();
    
    return message.channel.send(Embed).catch(() => message.channel.send("🎶 Danh sách phát sẽ được phát ngẫu nhiên"));
  }
};