const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "warn",
  category: "moderation",
  usage: "warn <@mention> <reason>",
  args: true,
  botPermission: ["ADMINISTRATOR"],
  authorPermission: ["ADMINISTRATOR"],
  description: "Cảnh cáo một ai đó làm trái lệnh",
  run: async (client, message, args) => {
    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send(
        "Hãy đề cập người mà bạn muốn cảnh cáo - warn <@user> <reason>"
      );
    }

    if (message.mentions.users.first().bot) {
      return message.channel.send("Bạn không thể cảnh cáo Bot");
    }

    if (message.author.id === user.id) {
      return message.channel.send("Bạn không thể cảnh cáo chính bạn");
    }

    if (user.id === message.guild.ownerID) {
      return message.channel.send(
        "Ơ kìa bạn, bạn trêu Ban Mai hả, làm sao mà bạn có hể Warn được chủ server ? -_-"
      );
    }

    const reason = args.slice(1).join(" ");

    if (!reason) {
      return message.channel.send(
        "Hãy chỉ định lý do warn - warn <@user> <reason>"
      );
    }

    let warnings = await client.data.get(`warnings_${message.guild.id}_${user.id}`);

 /*   if (warnings === 3) {
      return message.channel.send(
        `${
          message.mentions.users.first().username
        } already reached his/her limit with 3 warnings`
      );
    }*/

    if (warnings === null) {
      client.data.set(`warnings_${message.guild.id}_${user.id}`, 1);
      user.send(
        `Bạn đã bị cảnh cáo trong server **${message.guild.name}**, lý do: ${reason}`
      );
      await message.channel.send(
        `Bạn đã cảnh cáo **${
          message.mentions.users.first().username
        }**, Lý do: ${reason}`
      );
    } else if (warnings !== null) {
      client.data.add(`warnings_${message.guild.id}_${user.id}`, 1);
      user.send(
        `Bạn đã bị cảnh cáo trong server **${message.guild.name}**, Lý do: ${reason}`
      );
      await message.channel.send(
        `Bạn đã cảnh cáo **${
          message.mentions.users.first().username
        }**, Lý do: ${reason}`
      );
    }
    let channel = await client.data.fetch(`modlog_${message.guild.id}`);
    if (!channel) return;

    let embed = new MessageEmbed()
      .setColor("RED")
      .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
      .addField("**Moderation**", "Warn")
      .addField("**Warn**", user.user.username)
      .addField("**Mod**", message.author.username)
      .addField("**Lý do**", `${reason || "**Không có lý do**"}`)
      .addField("**Ngày**", message.createdAt.toLocaleString())
      .setFooter(message.member.displayName, message.author.displayAvatarURL())
      .setTimestamp();

    var sChannel = message.guild.channels.cache.get(channel);
    if (!sChannel) return;
    sChannel.send(embed);
  }
};
