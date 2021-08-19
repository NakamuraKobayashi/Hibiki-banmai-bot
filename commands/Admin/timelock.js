const Discord = module.require("discord.js");
const ms = require("ms"); //Make sure to install ms package

module.exports = {
  name: "timelock",
  description: "Set thời gian khóa kênh chat",
  usage: "timelock <time>",
  args: true,
  category: "admin",
  botPermission: ["MANAGE_SERVER", "MANAGE_CHANNELS"],
  authorPermission: ["MANAGE_SERVER", "MANAGE_CHANNELS"],
  run: async (client, message, args) => {
    const time = args.join(" ");
    message.channel.overwritePermissions([
      {
        id: message.guild.id,
        deny: ["SEND_MESSAGES"]
      }
    ]);
    const embed = new Discord.MessageEmbed()
      .setTitle("Cập nhật thay đổi kênh")
      .setDescription(
        `🔒 ${message.channel} Đã bị khóa trong vòng \`${time}\``
      )
      .setColor("RANDOM");
    message.channel.send(embed);

    setTimeout(function() {
      message.channel.overwritePermissions([
        {
          id: message.guild.id,
          null: ["SEND_MESSAGES"]
        }
      ]);
      const embed2 = new Discord.MessageEmbed()
        .setTitle("Cập nhật thay đổi kênh")
        .setDescription(`🔓 Đã hết thời gian khóa kênh ${message.channel}`)
        .setColor("RANDOM");
      message.channel.send(embed2);
    }, ms(time));
    message.delete();
  }
};
