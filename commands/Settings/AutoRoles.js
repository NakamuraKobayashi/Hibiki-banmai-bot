const Discord = require("discord.js");

const db = require("quick.db");

module.exports = {
  name: "setautoroles",
  aliases: ["setroles", "setrole", "setwelrole"],
  category: "settings",
  permissions: "ADMINISTRATOR",
  usage: "setautoroles",
  description: "Set Roles cho mem mới",
  botPermission: [
    "VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "MANAGE_ROLES",
    "MANAGE_GUILD"
  ],
  authorPermission: [
    "MANAGE_GUILD"
  ],
  run: async (client, message, args) => {
    let keys = ["member", "bot"];
    const key = await client.awaitReply(
      message,
      `**Hãy chọn cài đặt mà bạn muốn?\nKey: ${keys.join(
        " | "
      )}\nGõ \`hủy\` để dừng thiếp lập**`,
      180000,
      true
    );
    if (!key)
      return message.channel.send("Không có phản hồi trong thời gian chờ, hủy thiết lập...");
    if (key.content.toLocaleLowerCase() === "hủy")
      return message.channel.send("Hủy thiết lập...");
    if (!keys.includes(key.content.toLocaleLowerCase())) {
      client.send("Lỗi: bạn không cung cấp từ khóa hợp lệ.", message);
    }

    //Setup
    if (key.content.toLocaleLowerCase() === "member") {
      let roles = await client.awaitReply(
        message,
        `**Hãy đề cập role cho người mới!\n> @role\nGõ \`hủy\` để dừng thiết lập**`,
        180000,
        true
      );
      if (!roles)
        return message.channel.send("Không có phản hồi trong thời gian chờ, hủy thiết lập...");

      if (roles.content.toLocaleLowerCase() === "hủy")
        return message.channel.send("Hủy thiết lập...");

      let r = roles.mentions.roles.first();
      if (message.guild.me.roles.highest.comparePositionTo(r) < 0) {
        return message.channel.send(
          `Role của Ban Mai không cao hơn role **${r.name}**!`
        );
      }

      const wel = new Discord.MessageEmbed()
        .setDescription(`**Xong** Từ bây giờ, mem mới sẽ được thêm role này\n\`${r.name}\``)
        .setColor("GREEN");
      client.data.set(`roles_${message.guild.id}`, r.id);

      message.channel.send(wel);
    }
   if (key.content.toLocaleLowerCase() === "bot") {
      let roles = await client.awaitReply(
        message,
        `**Hãy đề cập role cho bot?\n> @botrole\nGõ \`hủy\` để dừng thiết lập**`,
        180000,
        true
      );
      if (!roles)
        return message.channel.send("Không có phản hồi trong thời gian chờ, hủy thiết lập...");

      if (roles.content.toLocaleLowerCase() === "hủy")
        return message.channel.send("Hủy thiết lập...");

      let r = roles.mentions.roles.first();
      if (message.guild.me.roles.highest.comparePositionTo(r) < 0) {
        return message.channel.send(
          `Role của Ban Mai không cao hơn role **${r.name}**!`
        );
      }

      const wel = new Discord.MessageEmbed()
        .setDescription(`**Xong** Từ bây giờ, bot mới sẽ được add role\n\`${r.name}\``)
        .setColor("GREEN");
      client.data.set(`roles_bot_${message.guild.id}`, r.id);

      message.channel.send(wel);
    }
  }
};
