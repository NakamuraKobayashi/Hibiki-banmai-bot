const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
  name: "quote",
  aliases: ["phake"],
  category: "fun",
  description: "không biết mô tả thế nào :v",
  usage: "quote <@user> <text>",
  args: true,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    let user = await client.resolveUser(args[0]);
    if (!user)
      return message.channel.send(
        "Bạn cần đề cập một người hoặc ID và Văn bản!"
      );

    let msg = args
      .slice(1)
      .join(" ")
 
    const e = user.displayAvatarURL({ format: "png" });
    const img = await canvacord.Canvas.quote({
      username: `${user.username}`,
      color: "#7289da",
      message: `${msg}`,
      image: e
    });
    let attachment = new Discord.MessageAttachment(img, "quote.png");
    return message.channel.send(attachment);
  }
};
