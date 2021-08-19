const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "changemymind",
  aliases: ["cmm"],
  description: "Thay đổi suy nghĩ của tôi meme",
  category: "fun",
 run: async (client , message, args) => {
    const text = args.join(" ");
    if (!text) return message.channel.send("Hãy chỉ định văn bản");
    const sendMsg = await message.channel.send("⚙ Đang xử lý hình ảnh..");
    const data = await fetch(
      `https://nekobot.xyz/api/imagegen?type=changemymind&text=${text}`
    ).then((res) => res.json());
    sendMsg.delete();
    const embed = new MessageEmbed()
      .setFooter(message.author.username)
      .setColor("BLUE")
      .setDescription(
        `[Nhấn vào đây nếu như hình ảnh không thể load.](${data.message})`
      )
      .setImage(data.message)
      .setTimestamp();

    message.channel.send({ embed });
  },
};
