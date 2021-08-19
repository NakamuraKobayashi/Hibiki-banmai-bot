const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "queue",
  aliases: ["q"],
  category: "music",
  description: "Xem hàng chờ phát nhạc!",
  usage: "queue",
  run: async (client, message, args) => {
    const Channel = message.member.voice.channel;

    if (!Channel) return message.channel.send("Hãy vào voice trước khi sử dụng :3");

    const Queue = await client.queue.get(message.guild.id);

    if (!Queue || !Queue.Songs)
      return message.channel.send(
        "Không có bài nào đang phát đâu, thêm nhạc đi bạn ơiiii :D"
      );
    
    const Sort = await Queue.Songs.map((Song, Position) => `${(Position + 1) === 1 ? "Đang Phát" : (Position - 1) === 0 ? 1 : (Position)} | ${Song.Title.length > 60 ? Song.Title.slice(0, 60) + "..." : Song.Title}`).join("\n");
    
    if (!Sort) return message.channel.send("Không có bài nào đang phát đâu, thêm nhạc đi bạn ưi :D");

    return message.channel.send("```" + Sort + "```", {
      split: { char: "\n" }
    });
  }
};
  