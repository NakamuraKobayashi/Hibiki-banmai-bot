const Discord = require("discord.js");

const db = require("quick.db");

module.exports = {
  name: "setautonick",
  category: "settings",
  aliases: ["setnickname", "setwelcomename"],
  permissions: "ADMINISTRATOR",
  usage: "setautonick",
  description: "Set tên cho mem mới",
  botPermission: [
    "VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "MANAGE_CHANNELS",
    "MANAGE_NICKNAMES",
    "MANAGE_GUILD"
  ],
  authorPermission: ["MANAGE_GUILD"],
  run: async (client, message, args) => {
    let keys = ["member", "bot"];
    const key = await client.awaitReply(
      message,
      `**Chọn nhưng cài đặt mà bạn muốn?\nKey: ${keys.join(
        " | "
      )}\ngõ \`hủy\` để dừng thiết lập**`,
      180000,
      true
    );
    if (!key)
      return message.channel.send("Không có phản hồi trong thời gian chờ, Hủy thiết lập...");
    if (key.content.toLocaleLowerCase() === "hủy")
      return message.channel.send("Hủy thiết lập...");
    if (!keys.includes(key.content.toLocaleLowerCase())) {
      client.send("Lỗi: Bạn đã cũng cấp từ khóa không hợp lệ.", message);
    }

    //Setup
    if (key.content.toLocaleLowerCase() === "member") {
      let nick = await client.awaitReply(
        message,
        `**Hãy nêu nickname mà bạn muốn đặt cho new member!\n> [nickname]\ngõ \`hủy\` để dùng thiếp lập**`,
        180000,
        true
      );
      if (!nick)
        return message.channel.send("Không có phản hồi trong thời gian chờ, hủy thiết lập...");

      if (nick.content.toLocaleLowerCase() === "hủy")
        return message.channel.send("Hủy thiết lập...");

      const wel = new Discord.MessageEmbed()
        .setDescription(
          `**Xong** Từ bây giờ, toi sẽ đặt cho người mới tham gia là\n\`${
            nick.content
          }\`\nXem\n\`${nick.content
            .split("{tag}")
            .join(message.author.username)}\``
        )
        .setColor("GREEN");
      client.data.set(`nicks_${message.guild.id}`, nick.content);

      message.channel.send(wel);
    }
    if (key.content.toLocaleLowerCase() === "bot") {
      let nick = await client.awaitReply(
        message,
        `**Hãy nêu tên muốn đặt cho Bot mới?\n> [Tên]\ngõ \`hủy\` để dừng thiết lập**`,
        180000,
        true
      );
      if (!nick)
        return message.channel.send("Không có phản hồi trong thời gian chờ, hủy thiết lập...");

      if (nick.content.toLocaleLowerCase() === "hủy")
        return message.channel.send("hủy thiết lập...");
      const wel = new Discord.MessageEmbed()
        .setDescription(
          `**Xong** Từ bây giờ, bot mới sẽ được đặt tên\n\`${
            nick.content
          }\`\nXem\n\`${nick.content
            .split("{tag}")
            .join(message.author.username)}`
        )
        .setColor("GREEN");
      client.data.set(`nicks_bot_${message.guild.id}`, nick.content);

      message.channel.send(wel);
    }
  }
};
