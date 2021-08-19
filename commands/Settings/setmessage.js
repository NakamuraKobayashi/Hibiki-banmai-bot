const Discord = require("discord.js");
const moment = require("moment-timezone");
module.exports = {
  name: "setmsg",
  category: "settings",
  botPermission: [
    "VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD"
  ],
  authorPermission: [
    "VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD"
  ],
  description: "Set the Message",
  run: async (client, message, args) => {
    message.delete();
    let keys = ["welcome", "leave"];
    let welcomes = [
      "{member}",
      "{username}",
      "{tag}",
      "{server}",
      "{size}",
      "{date}",
      "{position}"
    ];
    let leaves = [
      "{member}",
      "{username}",
      "{tag}",
      "{server}",
      "{size}",
      "{date}",
      "{position}"
    ];
    let levels = [
      "{member}",
      "{username}",
      "{tag}",
      "{server}",
      "{level}",
      "{xp}",
      "{orl_xp}"
    ];
    let wards = [
      "{user-mention}",
      "{server-name}",
      "{user-tag}",
      "{user-username}"
    ];
    var date = moment.tz("Asia/Hanoi");
    let joinPosition;
    const me = message.guild.members.cache.array();
    me.sort((a, b) => a.joinedAt - b.joinedAt);
    for (let i = 0; i < me.length; i++) {
      if (me[i].id == message.guild.member(message).id) joinPosition = i;
    }

    const key = await client.awaitReply(
      message,
      `**Chọn cài đặt mà bạn muốn?\nKey: ${keys.join(
        " | "
      )}\nGõ \`hủy\` để hủy thiết lập**`,
      180000,
      true
    );
    if (!key)
      return message.channel.send("Không có phản hồi trong thời gian chờ, hủy thiết lập...");
    if (key.content.toLocaleLowerCase() === "hủy")
      return message.channel.send("Hủy thiết lập...");
    if (!keys.includes(key.content.toLocaleLowerCase())) {
      client.send("Lỗi: Từ khóa không hợp lệ.", message);
    }

    //Setup
    if (key.content.toLocaleLowerCase() === "welcome") {
      let welcome = await client.awaitReply(
        message,
        `**Hãy điền tin nhắn chào mừng mà bạn muốn?\nCode: ${welcomes.join(
          " |"
        )}\nGõ \`hủy\` để dừng thiết lập**`,
        180000,
        true
      );
      if (!welcome)
        return message.channel.send("Không có phản hồi trong thời gian chờ, hủy thiết lập...");

      if (welcome.content.toLocaleLowerCase() === "hủy")
        return message.channel.send("Hủy thiết lập...");
      let msg = await client.EEmoji(welcome.content, client);
      client.data.set(`welmsg_${message.guild.id}`, msg);
      client.send(
        `**Xong** Từ bây giờ tôi sẽ gửi\n\`${msg}\`\n\nXem:\n${welcome.content
          .split(`{member}`)
          .join(message.author) // Member mention substitution
          .split(`{username}`)
          .join(message.author.username) // Username substitution
          .split(`{position}`)
          .join(joinPosition || 1) //member.guild.members.cache.size)
          .split(`{tag}`)
          .join(message.author.tag) // Tag substitution
          .split(`{date}`)
          .join(date.format("DD/MM/YYYY, hh:mm:hh z")) // member guild joinedAt
          .split(`{server}`)
          .join(message.guild.name) // Name Server substitution
          .split(`{size}`)
          .join(message.guild.members.cache.size)}`,
        message
      );
    }

    if (key.content.toLocaleLowerCase() === "leave") {
      let leave = await client.awaitReply(
        message,
        `**Hãy ghi tin nhắn rời máy chủ mà bạn muốn!?\nCode: ${leaves.join(
          " |"
        )}\nGõ \`hủy\` để dừng thiết lập**`,
        180000,
        true
      );
      if (!leave)
        return message.channel.send("Không có phản hồi trong thời gian chờ, hủy thiết lập...");
      if (leave.content.toLocaleLowerCase() === "hủy")
        return message.channel.send("Hủy thiết lập...");
      let msg = await client.EEmoji(leave.content, client);
      client.data.set(`levmsg_${message.guild.id}`, msg);
      client.send(
        `**Xong** Từ bây giờ tôi sẽ gửi\n\`${msg}\`\n\nXem:\n${leave.content
          .split(`{member}`)
          .join(message.author) // Member mention substitution
          .split(`{username}`)
          .join(message.author.username) // Username substitution
          .split(`{position}`)
          .join(joinPosition || 1) //member.guild.members.cache.size)
          .split(`{tag}`)
          .join(message.author.tag) // Tag substitution
          .split(`{date}`)
          .join(date.format("DD/MM/YYYY, hh:mm:ss z")) // member guild joinedAt
          .split(`{server}`)
          .join(message.guild.name) // Name Server substitution
          .split(`{size}`)
          .join(message.guild.members.cache.size)}`,
        message
      );
    }
    /*if (key.content.toLocaleLowerCase() === "anti-swear") {
      let words = await client.awaitReply(
        message,
        `**Please give a message to Warning Anti-swear?\nCode: ${wards.join(
          " |"
        )}\nType \`cancel\` to stop setup**`,
        180000,
        true
      );
      if (!words)
        return message.channel.send("No response was given, Exiting setup...");
      if (words.content.toLocaleLowerCase() === "cancel")
        return message.channel.send("Exiting setup...");

      let msg = await client.EEmoji(words.content, client);
      client.data.set(`message_${message.guild.id}`, msg);
      client.send(
        `**Done** From now on I will send\n\`${msg}\`\n\nView:\n${words.content
          .split("{user-mention}")
          .join("<@" + message.author.id + ">")
          .split("{server-name}")
          .join(message.guild.name)
          .split("{user-tag}")
          .join(message.author.tag)
          .split("{user-username}")
          .join(message.author.username)}`,
        message
      );
    }*/
    //Soon
    /*
    if (key.content.toLowerCase() === "level") {
      let level = await client.awaitReply(
        message,
        `**Please give a message to level?\nCode: ${levels.join(
          " |"
        )}\nType \`cancel\` to stop setup**`,
        180000,
        true
      );
      if (!level)
        return message.channel.send("No response was given, Exiting setup...");
      if (level.content.toLowerCase() === "cancel")
        return message.channel.send("Exiting setup...");
      client.data.set(`lvlmsg_${message.guild.id}`, level.content);
      client.send(
        `**Done** From now on I will send\n\`${
          level.content
        }\`\n\nView:\n${level.content
          .split(`{member}`)
          .join(message.author) // Member mention substitution
          .split(`{username}`)
          .join(message.author.username) // Username substitution
          .split(`{tag}`)
          .join(message.author.tag) // Tag substitution
          .split(`{server}`)
          .join(message.guild.name)
          .split(`{xp}`)
          .join("100")
          .split(`{orl_xp}`)
          .join("0")
          .split(`{level}`)
          .join("1")}`,
        message
      );
    }*/
  }
};
