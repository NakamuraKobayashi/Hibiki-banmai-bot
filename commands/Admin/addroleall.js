module.exports = {
  name: "addroleall",
  aliases: ["arall", "aroleall", "giveroleall"],
  description: "Thêm Role cho tất cả member trong Server",
  category: "admin",
  args: true,
  usage: "addroleall <Roles>",
  botPermission: ["MANAGE_ROLES"],
  authorPermission: ["MANAGE_ROLES"],
  run: async (client, message, args) => {
    const role =
      message.guild.roles.cache.find(
        role => role.name === args.join(" ").slice(1)
      ) ||
      message.mentions.roles.first() ||
      message.guild.roles.cache.get(args.join(" ").slice(1));

    if (message.guild.me.roles.highest.comparePositionTo(role) < 0) {
      return client.send(
        `${await client.emoji("DGH_error")} Role của tôi không cao hơn role **${role.name}** !`, message
      );
    }

    if (message.member.roles.highest.comparePositionTo(role) < 0) {
      return client.send(
        `${await client.emoji("DGH_error")} Role của bạn ở dưới role **${role.name}** nên bạn không thể sử dụng lệnh này!`,message
      );
    }

    if (!role) {
      return client.send(await client.emoji("DGH_info") + "Hãy đề cập một Role hợp lệ");
    }

    message.guild.members.cache.forEach(member => member.roles.add(role));
    client.send(
      `${await client.emoji("DGH_success")} Đã thêm Role **${role.name}** thành công cho tất cả mọi người!`, message
    );
  }
};
