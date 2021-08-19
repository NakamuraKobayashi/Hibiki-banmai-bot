const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "setnick",
  aliases: ["sn", "nick"],
  category: "moderation",
  description: "Set hoặc đổi biệt danh của member",
  usage: "setnick [mention | name | nickname | ID] <{tag}/nickname>",
  botPermission: ["CHANGE_NICKNAME"],
  args: true,
  category: "utility",
  run: async (client, message, args) => {
    const bot = client;
    message.delete()
    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      message.member;
    if (!member) return message.channel.send("**Hãy đề cập người dùng hoặc ID!**");

    if (
      member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >=
      0
    )
      return message.channel.send(
        "**Không thể Set hay Đổi biệt danh của người dùng này!**"
      );

    if (!args[1]) return message.channel.send("**Hãy chỉ định biệt danh**");

    let nick = args
      .slice(1)
      .join(" ")
      .replace(`{tag}`, member.user.username);

    try {
      member.setNickname(nick);
      const embed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(
          `**Đổi biệt danh của ${member.displayName} thành ${nick}**`
        );
      message.channel.send(embed);
    } catch {
      return message.channel.send("**Thiếu quyền - [Quản Lý Biệt Danh]");
    }

    let channel = db.fetch(`modlog_${message.guild.id}`);
    if (!channel) return;

    const sembed = new MessageEmbed()
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
      .setColor("#ff0000")
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setFooter(message.guild.name, message.guild.iconURL())
      .addField("**Moderation**", "setnick")
      .addField("**Người được thay đổi Nickname**", member.user.username)
      .addField("**Người thay đổi Nickname**", message.author.username)
      .addField("**Nickname được đổi thành**", nick)
      .addField("**Ngày**", message.createdAt.toLocaleString())
      .setTimestamp();

    var sChannel = message.guild.channels.cache.get(channel);
    if (!sChannel) return;
    sChannel.send(sembed);
  }
};
