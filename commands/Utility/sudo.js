module.exports = {
  name: "sudo",
  description: "Tạo webhook để mạo danh ai đó :))",
  usage: "sudo <user> <message>",
  category: "utility",
  args: true,
  cooldown: 5,
  botPermission: ["MANAGE_WEBHOOKS"],
  run: async (client, message, args) => {
    message.delete();
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send("Hãy đề cập một ai đó!");
    const webhook = await message.channel.createWebhook(user.displayName, {
      avatar: user.user.displayAvatarURL(),
      channel: message.channel.id
    });
    await webhook.send(args.slice(1).join(" ")).then(() => {
      webhook.delete();
    });
  }
};
