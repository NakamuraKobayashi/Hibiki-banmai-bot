const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");

module.exports = {
  name: "volume",
  aliases: ["vol", "v"],
  category: "music",
  description: "Xem mức âm lượng hiện tại và chỉnh âm lượng!",
  usage: "volume | <1 - 150>",
  run: async (client, message, args) => {
    const Channel = message.member.voice.channel;

    if (!Channel) return message.channel.send("Hãy vào trong voice để xem mức âm lượng hoặc chỉnh âm lượng!");

    const Queue = await client.queue.get(message.guild.id);

    if (!Queue)
      return message.channel.send(
        "Không có bài nào đang phát cả :D"
      );

    const Embed = new Discord.MessageEmbed()
      .setColor(Color)
      .setTitle("Volume")
      .setDescription(`🎶 Âm lượng - ${Queue.Volume}`)
      .setTimestamp();

    if (!args[0]) return message.channel.send(Embed).catch(() => message.channel.send(`🎶 Âm lượng - ${Queue.Volume}`));

    if (args[0]) {
      if (isNaN(args[0]))
        return message.channel.send("Hãy chỉ ra con số hợp lệ!");
      if (args[0] > 150) return message.channel.send("Giới hạn âm lượng: 150");
      if (parseInt(Queue.Volume) === parseInt(args[0]))
        return message.channel.send("Âm lượng hiện tại đang trùng với mức âm lượng bạn muốn chỉnh!");

      Queue.Volume = parseInt(args[0]);
      Queue.Bot.dispatcher.setVolumeLogarithmic(Queue.Volume / 100);
      
      const Embeded = new Discord.MessageEmbed()
      .setColor(Color)
      .setTitle("Thành Công")
      .setDescription(`🎶 Đã thay đổi mức âm lượng - ${Queue.Volume}`)
      .setTimestamp();
      
      return message.channel.send(Embeded).catch(() => message.channel.send(`🎶 Đã thay đổi mức âm lượng - ${Queue.Volume}`));
    };
  }
};