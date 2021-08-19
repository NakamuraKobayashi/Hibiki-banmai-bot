const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
  name: "level-roles",
  description: "Hiển thị danh sách các Level Role trong server.",
  category: "settings",
  botPermission: [
    "VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD"
  ],
  authorPermission: [
    "VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD"
  ],
  run: async (client, message, args) => {
    const Success = new Discord.MessageEmbed()
        .setAuthor(
          `${message.guild.name}`,
          `${message.guild.iconURL({ dynamic: true })}`
        )
        .setTitle("[ Level Roles ]")
        .setImage(
          "https://media.discordapp.net/attachments/832519166459510795/832837073274273797/Level_Roles.png?width=1085&height=610"
        )
        .setColor("#c98aff")
        .setTimestamp();
      let levels = await client.data.get(`level_role_${message.guild.id}`);
    if (levels && levels.length) {
      let array = [];
      levels.forEach((Roles, x) => {
        array.push(
          `__**${x + 1}.**__**Roles: ${Roles.Level_Role}\nĐến: ${
            Roles.Level_To_Reach
          }\nID: ${Roles.Level_Role_ID}**`
        );
      });
      Success.setDescription(array.join("\n\n") || "Không có Level Role nào.")
      return message.channel.send(Success);
    }
    if (!levels && !levels.length) {
      const No_Roles = new Discord.MessageEmbed()
        .setTitle("Không có Level Role nào.")
        .setColor("#c98aff")
        .setTimestamp();
      return message.channel.send(No_Roles);
    }
  
  }
};
