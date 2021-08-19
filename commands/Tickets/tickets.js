const { MessageEmbed } = require("discord.js");
let ticket = [];
module.exports = {
  name: "ticket",
  category: "ticket",
  description: "Tạo ticket của bạn",
  cooldown: 5,
  permission: "",
  bot: ["MANAGE_CHANNELS", "VIEW_CHANNEL", "MANAGE_ROLES"],
  run: async (client, message, args) => {
    let btn1 = new client.button.MessageButton()
      .setStyle("blurple")
      .setLabel("🎫  Mở 1 tickets!")
      .setID("1");
    message.delete();
    let embed = new MessageEmbed()
      .addField(
        "Mở 1 tickets!",
        `React Tickets, Tôi sẽ mở một kênh chat cho bạn!.`
      )
      .setColor("#468DFF")
      .setFooter(`Được cung cấp bởi hibiki.banmai.repl.co`);

    client.button.send(null, {
      channel: message.channel.id,
      embed: embed,
      buttons: [[btn1]]
    });
    client.button.on("1", async button => {
      let btn2 = new client.button.MessageButton()
        .setStyle(`grey`)
        .setLabel(`🔒  Đóng`)
        .setID("2");
      let ch = client.db.get(
        `tickets_${message.guild.id}_${button.clicker.user.id}`
      );
      if (ch) {
        button.reply(
          "Ticket của bạn đã được mở, Bấm <#" + ch + "> để xem ticket của bạn",
          { flags: 64 }
        );
      }
      if (!ch) {
        const channel = await button.guild.channels.create(
          `${button.clicker.user.username} ticket`,
          {
            topic: `Thông tin chung:
Tên Ticket: ${button.clicker.user.username}
Ticket ID: ${button.clicker.user.id}`,
            permissionOverwrites: [
              {
                id: button.guild.roles.everyone,
                deny: ["VIEW_CHANNEL"]
              },
              {
                id: button.clicker.user.id,
                allow: ["VIEW_CHANNEL"]
              },
              {
                id: client.user.id,
                allow: [
                  "VIEW_CHANNEL",
                  "MANAGE_CHANNELS",
                  "MANAGE_MESSAGES",
                  "SEND_MESSAGES"
                ]
              }
            ]
          }
        );
        button.reply(
          "Ticket của bạn đã được tạo, bấm <#" +
            channel.id +
            "> để xem ticket của bạn",
          { flags: 64 }
        );
        const embedticket = new MessageEmbed()
          .setTimestamp()
          .setTitle("Hỗ trợ")
          .setFooter(`Ticket mở lúc`)
          .setColor(0x5865f2)
          .setDescription(
            `Hỗ trợ sẽ có mặt với bạn.\nĐể đóng ticket, react 🔒`
          );
        client.button.send(`Welcome ${button.clicker.user}`, {
          channel: channel.id,
          embed: embedticket,
          buttons: [[btn2]]
        });
        client.db.set(
          `tickets_${message.guild.id}_${button.clicker.user.id}`,
          channel.id
        );
        client.db.set(
          `tickets_user_${message.guild.id}_${channel.id}`,
          button.clicker.user.id
        );
        client.button.on("2", async buttons => {
          let chs = client.db.get(
            `tickets_user_${message.guild.id}_${buttons.channel.id}`
          );
          if (chs !== buttons.clicker.user.id) {
            buttons.reply(
              `Xin lỗi, bạn không có quyền truy cập để xóa kênh này, kênh này chỉ duy nhất <@${chs}> mới có quyền xóa`,
              { flags: 64 }
            );
          }
          if (chs === buttons.clicker.user.id) {
            buttons.reply("Xóa sau 5 giây", { flags: 64 });
            setTimeout(function() {
              client.db.delete(
                `tickets_${message.guild.id}_${button.clicker.user.id}`
              );
              client.db.delete(
                `tickets_user_${message.guild.id}_${buttons.channel.id}`
              );
              buttons.channel.delete();
            }, 5000);
          }
        });
      }
    });
  }
};
