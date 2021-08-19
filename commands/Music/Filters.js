const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");

module.exports = {
  name: "filters",
  aliases: ["ft"],
  category: "music",
  description: "Xem danh sách filter",
  usage: "filters | <Filter Name>",
  run: async (client, message, args) => {
    const Channel = message.member.voice.channel;

    if (!Channel) return message.channel.send("Bạn phải ở trong Voice!");

    const Queue = await client.queue.get(message.guild.id);

    if (!Queue)
      return message.channel.send(
        "Không có bài nào đang phát, hãy thêm một vài bài vào hàng chờ :D"
      );

    const Filters = ["nightcore", "bassboost", "vaporwave", "phaser", "treble", "normalizer", "flanger"];
    const One = [];

    await Filters.forEach(async Filter => {
        let Status = await Queue.Filters[Filter] ? "Bật - ✅" : "Tắt - ❌";
        await One.push(`${Filter.charAt(0).toUpperCase() + Filter.slice(1)} - ${Status}`);
    });

    if (!args[0])
      return message.channel.send("```" + One.join("\n") + "```", { split: { char: "\n" } });

    if (!Filters.find(Fil => Fil === args[0].toLowerCase()))
      return message.channel.send(
        `Không tìm thấy Filter này - ` +
          args[0].charAt(0).toUpperCase() +
          args[0].slice(1)
      );

    args[0] = args[0].toLowerCase();
    
    let Finder = await Filters.find(Fil => Fil === args[0]);

    const Embed = new Discord.MessageEmbed()
      .setColor(Color)
      .setTitle("Filter Information")
      .addField("Name", Finder.charAt(0).toUpperCase() + Finder.slice(1))
      .addField("Status", Queue.Filters[args[0]] ? "Enabled" : "Disabled")
      .setFooter(`Requested By ${message.author.username}`)
      .setTimestamp();

    return message.channel
      .send(Embed)
      .catch(() =>
        message.channel.send(
          `${args[0].charAt(0).toUpperCase() + args[0].slice(1)} - ${
            Queue.Filters[args[0]] ? "Enabled" : "Disabled"
          }`
        )
      );
  }
};