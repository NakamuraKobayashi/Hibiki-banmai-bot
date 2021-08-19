const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "kick",
  category: "moderation",
  description: "Sút một ai đó ra khỏi máy chủ",
  usage: "kick <@user> <reason>",
  authorPermission: ["KICK_MEMBERS"],
  botPermission: ["KICK_MEMBERS"],
  args: true,
  run: async(client, message, args) => {
    try {
      const bot = client;
      if (!args[0]) return message.channel.send("**Hãy đề cập một người hoặc ID để Đá họ ra khỏi server!**");

      var kickMember =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find(
          r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
        ) ||
        message.guild.members.cache.find(
          ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()
        );
      if (!kickMember)
        return message.channel.send("**Người này không có trong máy chủ này!**");

      if (kickMember.id === message.member.id)
        return message.channel.send("**Bạn không thể tự đá vào đít của bạn được đâu :/!**");

      if (!kickMember.kickable)
        return message.channel.send("**Bạn không thể Kick người này**");
      if (kickMember.user.bot)
        return message.channel.send("**Không thể kick bot!**");

      var reason = args.slice(1).join(" ") || "Không có lý do";
      try {
        const sembed2 = new MessageEmbed()
          .setColor("RED")
          .setDescription(
            `**Bạn đã bị kick khởi server ${message.guild.name}, Lý do: ${reason ||
              "Không có lý do, chắc do bạn đen :))!"}**`
          )
          .setFooter(message.guild.name, message.guild.iconURL());
        kickMember
          .send(sembed2)
          .then(() => kickMember.kick())
          .catch(() => null);
      } catch {
        kickMember.kick();
      }
      if (reason) {
        var sembed = new MessageEmbed()
          .setColor("GREEN")
          .setDescription(
            `**${kickMember.user.username}** Đã bị kick, Lý do: ${reason}`
          );
        message.channel.send(sembed);
      } else {
        var sembed2 = new MessageEmbed()
          .setColor("GREEN")
          .setDescription(`**${kickMember.user.username}** Đã bị kick`);
        message.channel.send(sembed2);
      }
      let channel = await client.data.fetch(`modlog_${message.guild.id}`);
      if (!channel) return;

      const embed = new MessageEmbed()
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
        .setColor("#ff0000")
        .setThumbnail(kickMember.user.displayAvatarURL({ dynamic: true }))
        .setFooter(message.guild.name, message.guild.iconURL())
        .addField("**Moderation**", "kick")
        .addField("**Người bị kick**", kickMember.user.username)
        .addField("**Kick bởi**", message.author.username)
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
