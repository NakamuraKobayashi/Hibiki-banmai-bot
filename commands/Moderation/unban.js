const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "unban",
  description: "Gỡ bỏ lệnh Ban của một người đã bị Ban!",
  usage: "unban [name | tag | mention | ID] <reason> (optional)",
  aliases: ["ub", "unbanish"],
  category: "moderation",
  botPermission: ["ADMINISTRATOR"],
  authorPermission: ["ADMINISTRATOR"],
  run: async (client, message, args) => {
    const bot = client;
    if (!args[0]) return message.channel.send("**Hãy chỉ định ID, Tag, Tên của người muốn Unban!**");

    let bannedMemberInfo = await message.guild.fetchBans();

    let bannedMember;
    bannedMember =
      bannedMemberInfo.find(
        b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      bannedMemberInfo.get(args[0]) ||
      bannedMemberInfo.find(
        bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase()
      );
    if (!bannedMember)
      return message.channel.send(
        "**Vui lòng cung cấp tên người dùng, thẻ hoặc ID hợp lệ hoặc người dùng không bị cấm!**"
      );

    let reason = args.slice(1).join(" ");

    if (!message.guild.me.hasPermission("BAN_MEMBERS"))
      return message.channel.send(
        "**Tôi công có đủ quyền để hủy cấm một ai đó! - [BAN_MEMBERS]**"
      );
    try {
      if (reason) {
        message.guild.members.unban(bannedMember.user.id, reason);
        var sembed = new MessageEmbed()
          .setColor("GREEN")
          .setDescription(
            `**${bannedMember.user.tag} đã được hủy lệnh cấm, Lý do: ${reason}**`
          );
        message.channel.send(sembed);
      } else {
        message.guild.members.unban(bannedMember.user.id, reason);
        var sembed2 = new MessageEmbed()
          .setColor("GREEN")
          .setDescription(`**${bannedMember.user.tag} đã được hủy lệnh cấm**`);
        message.channel.send(sembed2);
      }
    } catch {}

    let channel = await client.data.fetch(`modlog_${message.guild.id}`);
    if (!channel) return;

    let embed = new MessageEmbed()
      .setColor("#ff0000")
      .setThumbnail(bannedMember.user.displayAvatarURL({ dynamic: true }))
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
      .addField("**Moderation**", "unban")
      .addField("**Unbanned**", `${bannedMember.user.username}`)
      .addField("**ID**", `${bannedMember.user.id}`)
      .addField("**Mod**", message.author.username)
      .addField("**Lý do**", `${reason}` || "**Không có lý do**")
      .addField("**Ngày**", message.createdAt.toLocaleString())
      .setFooter(message.guild.name, message.guild.iconURL())
      .setTimestamp();

    var sChannel = message.guild.channels.cache.get(channel);
    if (!sChannel) return;
    sChannel.send(embed);
  }
};
