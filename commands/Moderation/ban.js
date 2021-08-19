const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
module.exports = {
  name: "ban",
  aliases: ["b", "banish"],
  category: "moderation",
  description: "Cấm một ai đó ra khỏi máy chủ (hiện tại đang lỗi, vui lòng không sử dụng)",
  usage: "ban <@user> <reason>",
  args: true,
  authorPermission: ["BAN_MEMBERS"],
  botPermission: ["BAN_MEMBERS"],
  run: async (client, message, args) => {
    try {
      const bot = client;
      if (!args[0])
        return message.channel.send("**Hãy đề cập một người dùng để ban!**");

      let banMember =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find(
          r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
        ) ||
        message.guild.members.cache.find(
          ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()
        );
      if (!banMember)
        return message.channel.send("**Người này không có trong server**");
      if (banMember === message.member)
        return message.channel.send("**Bạn không thể Ban chính bản thân bạn**");

      var reason = args.slice(1).join(" ");

      if (!banMember.bannable)
        return message.channel.send("**Không thể Ban người chơi này**");
      try {
        message.guild.members.ban(banMember);
        banMember
          .send(
            `**Xin chào, bạn đã bị ban khỏi ${
              message.guild.name
            } Lý do - ${reason || "Không có lý do, do bạn đen thôi :))"}**`
          )
          .catch(() => null);
      } catch {
        message.guild.members.ban(banMember);
      }
      if (reason) {
        var sembed = new MessageEmbed()
          .setColor("GREEN")
          .setDescription(
            `**${banMember.user.username}** đã bị Ban, lý do: ${reason}`
          );
        message.channel.send(sembed);
      } else {
        var sembed2 = new MessageEmbed()
          .setColor("GREEN")
          .setDescription(`**${banMember.user.username}** Đã bị Ban`);
        message.channel.send(sembed2);
      }
      let channel = await client.data.fetch(`modlog_${message.guild.id}`);
      if (channel == null) return;

      if (!channel) return;

      const embed = new MessageEmbed()
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
        .setColor("#ff0000")
        .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }))
        .setFooter(message.guild.name, message.guild.iconURL())
        .addField("**Moderation**", "ban")
        .addField("**Banned**", banMember.user.username)
        .addField("**ID**", `${banMember.id}`)
        .addField("**Ban bởi**", message.author.username)
        .addField("**Lý do**", `${reason || "**Không có lý do**"}`)
        .addField("**Ngày**", message.createdAt.toLocaleString())
        .setTimestamp();

      var sChannel = message.guild.channels.cache.get(channel);
      if (!sChannel) return;
      sChannel.send(embed);
    } catch (e) {
      return message.channel.send(`**${e.message}**`);
    }
  }
};
