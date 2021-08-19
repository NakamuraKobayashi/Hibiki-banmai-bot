const Discord = require("discord.js");
const toHex = require("colornames");

module.exports = {
  name: "createrole",
  description: "Tạo một role mới trong Server",
  category: "admin",
  args: true,
  botPermission:["MANAGE_ROLES","ADMINISTRATOR"],
  authorPermission:["MANAGE_ROLES","ADMINISTRATOR"],
  usage: "createrole <màu> <tên>",
  run: async (client, message, args) => {
    const name = args.slice(1).join(" ");
    const regex = !/[^a-zA-Z0-9]+/g.test(name);
    if (!name) {
      return client.send(client.emoji("DGH_error") + " Bạn cần nhập tên cho Role mới!", message);
    }
    if (regex === false) {
      return client.send(
        await client.emoji("DGH_error") +" Đó không phải là tên role hợp lệ. Tên Role chỉ chứa các chữ cái và số",message
      );
    }
    if (name.length > 100) {
      return client.send(
        await client.emoji("DGH_error") +" Tên role không thể dài hơn 100 ký tự !", message
      );
    }
   const rr = await message.guild.roles.create({
      data: {
        name: name.join("-"),
        color: toHex(args[0])
      }
    });
    let embed = new Discord.MessageEmbed()
      .setAuthor(
        `${message.author.username} - (${message.author.id})`,
        message.author.displayAvatarURL()
      )
      .setColor("RANDOM").setDescription(`
**Role: ** ${rr}
**Hành động: ** Role mới được tạo
**Màu role: ** ${args[0]}
**Kênh: ** ${message.channel}
**Bởi: ** ${message.member}
      `);
    message.channel.send(embed);
  }
};
