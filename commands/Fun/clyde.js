const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "clyde",
  description: "làm cho clyde nói gì đó",
  category: "fun",
  run : async (client , message, args) => {
    const text = args.join(" ");
    if (!text) return message.reply("hãy chỉ định một văn bản");

    const data = await fetch(
      `https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`
    ).then((res) => res.json());

    const embed = new MessageEmbed()
      .setTitle("Clyde")
      .setImage(data.message)
      .setFooter(message.author.username)
      .setColor("BLUE")
      .setDescription(
        `[Nhắn vào đây nếu như ảnh không thể load.](${data.message})`
      );

    message.channel.send(embed);
  },
};
