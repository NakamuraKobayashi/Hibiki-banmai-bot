const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "setimage",
  category: "settings",
  args: true,
  usage: "setimage",
 botPermission: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],
  authorPermission: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],
   description: "Set the background",
  run: async(client, message, args) => {
    function isURL(url) {
      if (!url) return false;
      var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))|" + // OR ip (v4) address
        "localhost" + // OR localhost
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      return pattern.test(url);
    }
    const [key, ...value] = args;
    switch (key) {
      default:
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("RED")
            .setTimestamp()
            .setFooter(
              message.author.tag,
              message.author.displayAvatarURL({ dynamic: true }) ||
                client.user.displayAvatarURL({ dynamic: true })
            )
            .setDescription("Lỗi: Từ khóa không hợp lệ, vui lòng thử lại!")
        );
      case "leave":
        {
          const n = args.slice(1).join(" ");
          if (!n) {
            return message.channel.send(
              `${await client.emoji("DGH_error")} URL ảnh không hợp lệ, hãy chắc chắn rằng URL này còn hoạt động`
            );
          }
          if (!isURL(n)) {
            return message.channel.send(
              `${await client.emoji("DGH_error")} URL ảnh không hợp lệ, hãy chắc chắn rằng URL này còn hoạt động`
            );
          }
          client.data.set(`levimage_${message.guild.id}`, n);
          const leave = new Discord.MessageEmbed()
            .setDescription(
              `**Xong** Từ giờ ảnh member rời mới sẽ là ${n}!`
            )
            .setColor("RED");
          message.channel.send(leave);
        }
        break;
      case "welcome":
        {
          const n2 = args.slice(1).join(" ");
          if (!n2) {
            return message.channel.send(
              `${await client.emoji("DGH_error")} URL không hợp lệ, hãy chắc chắn rằng URL này còn hoạt động`
            );
          }
          if (!isURL(n2)) {
            return message.channel.send(
              `${await client.emoji("DGH_error")} URL không hợp lệ, hãy chắc chắn rằng URL này còn hoạt động`
            );
          }
          client.data.set(`welimage_${message.guild.id}`, n2);
          const welcome = new Discord.MessageEmbed()
            .setDescription(
              `**Xong** Từ giờ ảnh chào mừng member mới sẽ là ${n2} nhé !`
            )
            .setColor("RED");
          message.channel.send(welcome);
        }
        break;
      case "level": {
        const n = args.slice(1).join(" ");
        if (!n) {
          return message.channel.send(
            `${await client.emoji("DGH_error")} URL không hợp lệ, hãy chắc chắn rằng URL này còn hoạt động`
          );
        }
        if (!isURL(n)) {
          return message.channel.send(
            `${await client.emoji("DGH_error")} URL không hợp lệ, hãy chắc chắn rằng URL này còn hoạt động`
          );
        }
        client.data.set(`levelimg_${message.guild.id}`, n);
        const level = new Discord.MessageEmbed()
          .setDescription(
            `**Xong** Từ giờ ảnh level mới sẽ là ${n}`
          )
          .setColor("RED");
        message.channel.send(level);
      }
    }
  }
};
