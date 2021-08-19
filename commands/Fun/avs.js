const { createCanvas, loadImage } = require("canvas");
const request = require("node-superfetch");
module.exports = {
  name: "avatarfusion",
  aliases: ["avf", "avaf"],
  category: "fun",
  description: "kết hợp 2 avatar của 2 người lại với nhau",
  usage:
    "[đề cập, id, username, nickname của người thứ nhất] <đề cập, id, username, nickname của người thứ hai> ",

  run: async (bot, message, args) => {
    if (!message.guild.me.hasPermission("ATTACH_FILES"))
      return message.channel.send("**Thiếu quyền hạn - [Đính kèm tập tin]!**");
    if (!args[0])
      return message.channel.send(
        "**Bạn muốn đặt ai ở dưới?**"
      );
    if (!args[1])
      return message.channel.send(
        "**Bạn muốn đặt ai ở trên?**"
      );
    let base =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName === args[0].toLocaleLowerCase()
      );
    if (!base) return message.channel.send("**Không tìm thấy base của người dùng này!**");
    let overlay =
      message.mentions.members.first(2)[1] ||
      message.guild.members.cache.get(args[1]) ||
      message.guild.members.cache.find(
        r => r.user.username.toLowerCase() === args[1].toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName === args[1].toLocaleLowerCase()
      );
    if (!overlay) return message.channel.send("**Không tìm thấy người dùng Overlay!**");
    const baseAvatarURL = base.user.displayAvatarURL({
      format: "png",
      size: 512
    });
    const overlayAvatarURL = overlay.user.displayAvatarURL({
      format: "png",
      size: 512
    });
    try {
      const baseAvatarData = await request.get(baseAvatarURL);
      const baseAvatar = await loadImage(baseAvatarData.body);
      const overlayAvatarData = await request.get(overlayAvatarURL);
      const overlayAvatar = await loadImage(overlayAvatarData.body);
      const canvas = createCanvas(baseAvatar.width, baseAvatar.height);
      const ctx = canvas.getContext("2d");
      ctx.globalAlpha = 0.5;
      ctx.drawImage(baseAvatar, 0, 0);
      ctx.drawImage(overlayAvatar, 0, 0, baseAvatar.width, baseAvatar.height);
      return message.channel.send({
        files: [{ attachment: canvas.toBuffer(), name: "avatarfusion.png" }]
      });
    } catch (err) {
      return message.channel.send(
        `U nu, đã có lỗi xảy ra: \`${err.message}\`. vui lòng thử lại sau!`
      );
    }
  }
};
