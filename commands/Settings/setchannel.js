const Discord = require("discord.js");
const db = require("quick.db");
const fs = require("fs");
const Guild = require("../../models/log"); //require our log model
const mongoose = require("mongoose");

module.exports = {
  name: "setchannel",
  category: "settings",
  description: "Cài đặt kênh",
  botPermission: [
    "VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "MANAGE_WEBHOOKS"
  ],
  authorPermission: [
    "VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD"
  ],
  run: async (client, message, args) => {
    message.delete();
    let keys = [
      "welcome",
      "leave",
      "report",
      "level",
      "moderation-log",
      "log-server",
      "chat-bot",
      "starboard"
    ];
    const key = await client.awaitReply(
      message,
      `**Hãy chọn cài đặt mà bạn muốn set?\nKey: ${keys.join(
        " | "
      )}\nGõ \`hủy\` dể dừng thiết lập**`,
      180000,
      true
    );
    if (!key)
      return message.channel.send("Không có phản hồi trong thời gian chờ, hủy thiết lập...");
    if (key.content.toLocaleLowerCase() === "hủy")
      return message.channel.send("Hủy thiết lập...");
    if (!keys.includes(key.content.toLocaleLowerCase())) {
      client.send("Bạn đã không cung cấp từ khóa hợp lệ.", message);
    }

    //Setup
    if (key.content.toLocaleLowerCase() === "welcome") {
      let welcome = await client.awaitReply(
        message,
        `**Hãy đề cập hoặc ID kênh muốn chào mừng member!\nKhông set Danh Mục hoặc Voice
        \nGõ \`hủy\` để dừng thiết lập**`,
        180000,
        true
      );
      if (!welcome)
        return message.channel.send("Không có phản hồi trong thời gian chờ, Hủy thiết lập...");

      if (welcome.content.toLocaleLowerCase() === "hủy")
        return message.channel.send("Hủy thiết lập...");
      const channel =
        welcome.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        welcome.guild.channels.cache.find(
          c => c.name.toLowerCase() === welcome.content.toLocaleLowerCase()
        );
      if (!channel || channel.type !== "text")
        return client.send("**Hãy đề cập hoặc ID của một kênh văn bản!**");
      client.data.set(`welchannel_${message.guild.id}`, channel.id);
      client.send(
        `**Xong** Từ bây giờ, Ban Mai sẽ gửi tin nhắn chào mừng vào kênh ${channel}`,
        message
      );
    }

    if (key.content.toLocaleLowerCase() === "leave") {
      let content = await client.awaitReply(
        message,
        `**Hãy đề cập hoặc ID một kênh để thông báo member rời server\nKhông set Danh Mục hoặc Voice 
        \nGõ \`hủy\` để dừng thiết lập**`,
        180000,
        true
      );
      if (!content)
        return message.channel.send("Không có phản hồi trong thời gian chờ, hủy thiết lập...");

      if (content.content.toLocaleLowerCase() === "hủy")
        return message.channel.send("Hủy thiết lập...");
      const channel =
        content.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        content.guild.channels.cache.find(
          c => c.name.toLowerCase() === content.content.toLocaleLowerCase()
        );
      if (!channel || channel.type !== "text")
        return client.send("**Hãy đề cập kênh văn bản!**");
      client.data.set(`levchannel_${message.guild.id}`, channel.id);
      client.send(
        `**Xong** Từ bây giờ, Ban Mai sẽ thông báo member rời ở kênh ${channel}`,
        message
      );
    }

    if (key.content.toLocaleLowerCase() === "level") {
      let content = await client.awaitReply(
        message,
        `**Hãy đề cập một kênh để thông báo Level Up\nKhông set Danh Mục hoặc Voice
        \nGõ \`hủy\` để dừng thiết lập**`,
        180000,
        true
      );
      if (!content)
        return message.channel.send("Không có phản hồi trong thời gian chờ, hủy thiết lập...");

      if (content.content.toLocaleLowerCase() === "hủy")
        return message.channel.send("Hủy thiết lập...");
      const channel =
        content.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        content.guild.channels.cache.find(
          c => c.name.toLowerCase() === content.content.toLocaleLowerCase()
        );
      if (!channel || channel.type !== "text")
        return client.send("**Hãy đề cập kênh văn bản!**");
      client.data.set(`levelch_${message.guild.id}`, channel.id);
      client.send(
        `**Xong** Từ bây giờ, Ban Mai sẽ gửi thông báo level up ở kênh ${channel}`,
        message
      );
    }

    if (key.content.toLocaleLowerCase() === "report") {
      let content = await client.awaitReply(
        message,
        `**Hãy đề cập một kênh để gửi report\nKhông set Danh Mục hoặc Voice
        \nGỡ \`hủy\` để dừng thiết lập**`,
        180000,
        true
      );
      if (!content)
        return message.channel.send("Không có phản hồi trong thời gian chờ, hủy thiết lập...");

      if (content.content.toLocaleLowerCase() === "hủy")
        return message.channel.send("Hủy thiết lập...");
      const channel =
        content.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        content.guild.channels.cache.find(
          c => c.name.toLowerCase() === content.content.toLocaleLowerCase()
        );
      if (!channel || channel.type !== "text")
        return client.send("**Hãy đề cập kênh văn bản!**");
      client.data.set(`reports_${message.guild.id}`, channel.id);
      client.send(
        `**Xong** Từ bây giờ, Ban Mai sẽ gửi đơn report ở kênh ${channel}`,
        message
      );
    }

    if (key.content.toLocaleLowerCase() === "moderation-log") {
      let content = await client.awaitReply(
        message,
        `**Hãy đề cập một kênh Mod Log\nKhông set Danh Mục hoặc Voice
        \nGõ \`hủy\` để dừng thiết lập**`,
        180000,
        true
      );
      if (!content)
        return message.channel.send("Không có phản hồi trong thời gian chờ, hủy thiết lập...");

      if (content.content.toLocaleLowerCase() === "hủy")
        return message.channel.send("Hủy thiết lập...");
      const channel =
        content.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        content.guild.channels.cache.find(
          c => c.name.toLowerCase() === content.content.toLocaleLowerCase()
        );
      if (!channel || channel.type !== "text")
        return client.send("**Hãy đề cập kênh văn bản!**");
      client.data.set(`modlog_${message.guild.id}`, channel.id);
      client.send(
        `**Xong** Từ bây giờ, Ban Mai sẽ gửi Mod Log trong kênh ${channel}`,
        message
      );
    }

    if (key.content.toLocaleLowerCase() === "log-server") {
      let content = await client.awaitReply(
        message,
        `**Hãy đề cập kênh để gửi Server Log\nKhông set Danh Mục hoặc Voice
        \nGõ \`hủy\` để dừng thiết lập**`,
        180000,
        true
      );
      if (!content)
        return message.channel.send("Không có phản hồi trong thời gian chờ, hủy thiết lập...");

      if (content.content.toLocaleLowerCase() === "hủy")
        return message.channel.send("Hủy thiết lập...");
      const channel =
        content.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        content.guild.channels.cache.find(
          c => c.name.toLowerCase() === content.content.toLocaleLowerCase()
        );
      if (!channel || channel.type !== "text")
        return client.send("**Hãy đề cập kênh văn bản!**");

      const guild1 = message.guild;
      let webhookid;
      let webhooktoken;
      await channel
        .createWebhook(guild1.name, {
          avatar: guild1.iconURL({ format: "png" })
        })
        .then(webhook => {
          webhookid = webhook.id;
          webhooktoken = webhook.token;
        });

      await Guild.findOne(
        //will find data from database
        {
          guildID: message.guild.id
        },
        async (err, guild) => {
          if (err) console.error(err);
          if (!guild) {
            // what the bot should do if there is no data found for the server
            const newGuild = new Guild({
              _id: mongoose.Types.ObjectId(),
              guildID: message.guild.id,
              guildName: message.guild.name,
              logChannelID: channel.id,
              webhookid: webhookid,
              webhooktoken: webhooktoken
            });

            await newGuild
              .save() //save the data to database(mongodb)
              .then(result => console.log(result))
              .catch(err => console.error(err));

            client.send(
              `**Xong** Từ bây giờ, Ban Mai sẽ gửi Server Log vào kênh ${channel}`,
              message
            );
          } else {
            guild
              .updateOne({
                //if data is found then update it with new one
                logChannelID: channel.id,
                webhooktoken: webhooktoken,
                webhookid: webhookid
              })
              .catch(err => console.error(err));

            return client.send(
              `Kênh Log đã được cập nhật thành kênh ${channel}`,
              message
            );
          }
        }
      );
    }

    if (key.content.toLocaleLowerCase() === "starboard") {
      let content = await client.awaitReply(
        message,
        `**Đề cập một kênh để gửi Bảng Xếp Hạng\nKhông set Danh Mục hoặc Voice
        \nGõ \`hủy\` để dừng thiết lập**`,
        180000,
        true
      );
      if (!content)
        return message.channel.send("Không có phản hồi trong thời gian chờ, hủy thiết lập...");

      if (content.content.toLocaleLowerCase() === "hủy")
        return message.channel.send("Hủy thiết lập...");
      const channel =
        content.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        content.guild.channels.cache.find(
          c => c.name.toLowerCase() === content.content.toLocaleLowerCase()
        );
      if (!channel || channel.type !== "text")
        return client.send("**Hãy đề cập một kênh văn bản!**");
      client.data.set(`starboard_${message.guild.id}`, channel.id);
      client.send(
        `**Xong** Từ giờ Ban Mai sẽ gửi thông tin Bảng Xếp Hạng vào kênh ${channel}`,
        message
      );
    }

    if (key.content.toLocaleLowerCase() === "auto-publico") {
      let content = await client.awaitReply(
        message,
        `**Hãy đề cập một kênh để gửi Thông báo kênh công khai tự động\nGõ \`hủy\` để dừng thiết lập**`,
        180000,
        true
      );
      if (!content)
        return message.channel.send("Không có phản hồi trong thời gian chờ, hủy thiết lập...");

      if (content.content.toLocaleLowerCase() === "hủy")
        return message.channel.send("Hủy thiết lập...");
      const channel =
        content.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        content.guild.channels.cache.find(
          c => c.name.toLowerCase() === content.content.toLocaleLowerCase()
        );
      if (!channel || channel.type !== "news")
        return client.send("**Hãy đề cập kênh để thông báo tin hợp lệ!**");
      client.data.push(`Announcement_${message.guild.id}`,channel.id);
      client.send(
        `**Xong** Từ bây giờ Ban Mai sẽ gửi thông báo tin mới vào kênh ${channel}`,
        message
      );
    }

    if (key.content.toLocaleLowerCase() === "chat-bot") {
      let content = await client.awaitReply(
        message,
        `**Hãy đề cập một kênh để setup Chat Bot\nKhông set Danh Mục Hoặc Voice
        \nGỡ \`hủy\` để dừng thiết lập**`,
        180000,
        true
      );
      if (!content)
        return message.channel.send("Không có phản hồi trong thời gian chờ, hủy thiết lập...");

      if (content.content.toLocaleLowerCase() === "hủy")
        return message.channel.send("Hủy thiết lập...");
      const channel =
        content.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        content.guild.channels.cache.find(
          c => c.name.toLowerCase() === content.content.toLocaleLowerCase()
        );
      if (!channel || channel.type !== "text")
        return client.send("**Hãy đề cập kênh văn bản!**");
      client.data.set(`chatbot_${message.guild.id}`, channel.id);
      client.send(
        `**Xong** Từ Giờ, Ban Mai sẽ nói chuyện với mọi người ở kênh ${channel}`,
        message
      );
    }
  }
};
