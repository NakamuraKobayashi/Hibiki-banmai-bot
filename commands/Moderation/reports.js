const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
module.exports = {
  name: "report",
  category: "moderation",
  description: "Báo cáo một ai đó cho Admin, Mod của server!",
  usage: "report <@user> <reason>",
  botPermission: ['MANAGE_GUILD','VIEW_CHANNEL'],
  run: async (client, message, args) => {
    const bot = client;
    let User = message.mentions.users.first() || null;

    if (User == null) {
      return message.channel.send(`Bạn đã không đề cập một người dùng!`);
    } else {
      let Reason = args.slice(1).join(" ")
      if (!Reason) {
        return message.channel.send(
          `Bạn đã không đưa ra lý do report người này!`
        );
      }
      let Avatar = User.displayAvatarURL();
      let Channel = await client.data.get(`reports_${message.guild.id}`);
      if (!Channel)
        return message.channel.send(
          `Xin lỗi, không có kênh nào được cài đặt để gửi Report.\nHãy sử dụng lệnh 'niji!setchannel' trước để set kênh report!`
        );
      message.delete()
      client.send("Ticket report của bạn đã được gửi đến kênh <#"+Channel+"> Chúng tôi sẽ kiểm tra lệnh report của bạn!", message,"dm")
      let Embed = new MessageEmbed()
        .setTitle(`Report Mới!`)
        .setDescription(
          `\`${message.author.tag}\` Đã report \`${User.tag}\`! `
        )
        .setColor(`RED`)
        .setThumbnail(Avatar)
        .addFields(
          { name: "Mod ID", value: `${message.author.id}`, inline: true },
          { name: "Mod Tag", value: `${message.author.tag}`, inline: true },
          { name: "Reported ID", value: `${User.id}`, inline: true },
          { name: "Reported Tag", value: `${User.tag}`, inline: true },
          { name: "Lý do", value: `\`${Reason}\``, inline: true },
          {
            name: "Ngày (D/M/Y)",
            value: `${new Intl.DateTimeFormat("vi-VN").format(
              Date.now()
            )}`,
            inline: true
          }
        );
      const sender = client.channels.cache.get(Channel);

      sender.send(Embed);
    }
  }
};
