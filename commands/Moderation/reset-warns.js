const db = require("quick.db");

module.exports = {
  name: "resetwarns",
  aliases: ["rwarns"],
  usage: "rwarns <@user>",
  args: true,
  category: "moderation",
  botPermission: ["ADMINISTRATOR"],
  authorPermission: ["ADMINISTRATOR"],
 description: "Reset số lần cảnh cáo của một member",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(
        "Bạn cần có quyền Admin để sử dụng lệnh này"
      );
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send(
        "Hãy đề cập người mà bạn muốn Reset cảnh cáo"
      );
    }

    if (message.author.id === user.id) {
      return message.channel.send("Bạn không được phép Reset cảnh cáo của chính bạn!");
    }

    if (message.mentions.users.first().bot) {
      return message.channel.send("Bot không thể có Cảnh Cáo");
    }

    let warnings = await client.data.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) {
      return message.channel.send(
        `${message.mentions.users.first().username} Không có bất kỳ cảnh cào nào`
      );
    }

    client.data.delete(`warnings_${message.guild.id}_${user.id}`);
    user.send(
      `Tất cả Cảnh Cáo của bạn đã được reset bởi ${message.author.username} Trong server ${message.guild.name}`
    );
    await message.channel.send(
      `Reset tất cả Cảnh cáo của ${message.mentions.users.first().username}`
    );
  }
};
