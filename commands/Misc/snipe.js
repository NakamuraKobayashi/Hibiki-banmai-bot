const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "snipe",
  category: "misc",
  usage: "snipe",
  description: "Đọc tin nhắn bị xóa gần nhất",
  botPermission: ["MANAGE_MESSAGES", "ATTACH_FILES"],
  run: async (client, message, args) => {
    const msg = client.snipe.get(message.channel.id);
    if (!msg)
      client.send("Không có tin nhắn bị xóa nào ở kênh này!", message);
    if (msg) {
      let Embed = new Discord.MessageEmbed()
        .setDescription(
          `**Người nhắn : ** *${msg.author}* - (**\`${
            msg.author.id
          }\`**)\n\n**Tin nhắn bị xóa : **\`\`\`\n${msg.content.replace(
            /`/g,
            "'"
          ) || "Tin nhắn không hợp lệ"}\n\`\`\``
        )
        .setColor("RANDOM");
      if (msg.image) Embed.setImage(msg.image);
      message.channel.send(Embed);
    }
  }
};