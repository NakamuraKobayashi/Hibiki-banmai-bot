module.exports = {
  name: "removeroleall",
  aliases: ["rrall", "rroleall", "takeroleall"],
  description: "gỡ một role khỏi tất cả các member trong máy chủ",
  category: "admin",
  args: true,
  usage: "removeroleall <roles>",
 botPermission:["MANAGE_ROLES","ADMINISTRATOR"],
  authorPermission:["MANAGE_ROLES","ADMINISTRATOR"],
   run:async (client, message, args) => {
  const role =
      message.guild.roles.cache.find(
        role => role.name === args.join(" ").slice(1)
      ) ||
      message.mentions.roles.first() ||
      message.guild.roles.cache.get(args.join(" ").slice(1));

    if (message.guild.me.roles.highest.comparePositionTo(role) < 0) {
      return client.send(
        `${await client.emoji("DGH_error")} Role của tôi không đủ cao để gỡ role **${role.name}** !`, message
      );
    }

    if (message.member.roles.highest.comparePositionTo(role) < 0) {
      return client.send(
        `${await client.emoji("DGH_error")} Role của bạn phải cao hơn role **${role.name}** để có thể gỡ!`,message
      );
    }

    if (!role) {
      return client.send(await client.emoji("DGH_info") + "Hãy đề cập một Role hợp lệ");
    }

    message.guild.members.cache.forEach(member => member.roles.remove(role));
    client.send(
      `${await client.emoji("DGH_success")} Đã gỡ role **${role.name}** khỏi tất cả các member`, message
    );
  }
};
