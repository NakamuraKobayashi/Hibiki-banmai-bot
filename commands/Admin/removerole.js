const Discord = require("discord.js");
const toHex = require("colornames");

module.exports = {
  name: "removerole",
  description: "Xóa role",
  category: "admin",
  args: true,
  cooldown: 1,
  botPermission:["MANAGE_ROLES","ADMINISTRATOR"],
  authorPermission:["MANAGE_ROLES","ADMINISTRATOR"],
   usage: "removerole <Name>",
  run: async (client, message, args) => {
   message.delete()
     let roleDelete =
        message.mentions.roles.first() ||
        message.guild.roles.cache.get(args[0]) ||
        message.guild.roles.cache.find((r) => r.name == args[0]);
      if (!roleDelete)
        return client.send(
          `${await client.emoji("DGH_error")} Bạn đã không chỉ định tên hoặc ID của role mà bạn muốn xóa!`
        );
      roleDelete.delete();
    let embed = new Discord.MessageEmbed()
      .setAuthor(
        `${message.author.username} - (${message.author.id})`,
        message.author.displayAvatarURL()
      )
      .setColor("RANDOM").setDescription(`
**Role: ** ${roleDelete.name}
**Hành Động: ** Xóa role
**Màu Role: ** ${roleDelete.color}
**Kênh: ** ${message.channel}
**Bởi: ** ${message.member}
      `);
    message.channel.send(embed);
  }
};
