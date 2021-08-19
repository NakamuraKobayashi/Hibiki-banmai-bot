const discord = require("discord.js");
module.exports = {
  name: "bug",
  category: "moderation",
  args: true,
  description:
    "Hãy chỉ định một lỗi, Ví dụ: Bot không Đấm người mà tôi đề cập`",
  usage:
    "bug <lỗi muốn báo cáo lại>",
  run: async (client, message, args) => {
    // again make this fit your command handler style 😀
    args = args.join(" ");
    message.delete();
    const channels = message.channel;
    let check;
    if (args[0] === "temp") {
      check = "true";
    } else if (args[1] === "temp") {
      check = "true";
    } else {
      check = "false";
    }
    let check2;
    if (args[0] === "temp") {
      check2 = "86400";
    } else if (args[1] === "temp") {
      check2 = "86400";
    } else {
      check2 = "0";
    }
    client.send(
      "Cảm ơn bạn đã báo cáo lỗi!", message
    );
    channels
      .createInvite({
        temporary: `${check}`,
        maxAge: `${check2}`,
        maxUses: 0,
        reason: `Được yêu cầu bởi : ${message.author.username}`
      })
      .then(InviteCode =>
        client.users.fetch("579566400360808459").send(
          new discord.MessageEmbed()
            .setTitle("Báo cáo lỗi mới")
            .addField(
              "Tên người dùng",
              `**${message.author.username}#${message.author.discriminator}**`
            )
            .addField("ID User", message.author.id)
            .addField("Báo cáo", args)
            .addField("Tên Server", `**${message.guild.name}**`)
            .addField("ID Server", `**${message.guild.id}**`)
            .addField("USER SEARCH", `**[Nhấn vào đây](https://discordapp.com/users/${message.guild.id}/)**`)
            .addField(`Link Server`, `https://discord.gg/${InviteCode.code}`)
            .setColor("RANDOM")
        )
      );
  }
};
