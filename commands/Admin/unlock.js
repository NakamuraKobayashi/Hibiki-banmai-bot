const Discord = module.require("discord.js");

module.exports = {
  name: "unlock",
  description: "Mở khóa một kênh đang bị khóa",
  aliases: ["mở-khóa"],
  usage: "unlock",
  category: "admin",
  permissions: "MANAGE_CHANNELS",
  authorPermission: ["MANAGE_CHANNELS"],
  botPermission: ["MANAGE_CHANNELS"],
  run: async (client, message, args) => {
    message.channel.overwritePermissions([
      {
        id: message.guild.id,
        null: ["SEND_MESSAGES"]
      }
    ]);
    const embed = new Discord.MessageEmbed()
      .setTitle("Cập nhật thay đổi kênh")
      .setDescription(`🔓 ${message.channel}  đã được mở khóa!`)
      .setColor("RANDOM");
    await message.channel.send(embed);
    message.delete();
  }
};
