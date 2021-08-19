const Discord = require("discord.js");
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");
const Color = `RANDOM`;

module.exports = {
  name: "addemoji",
  category: "admin",
  permissions: "MANAGE_EMOJIS",
  args: true,
  description: "addemoji <url>",
  usage: "addemoji <url>",
  authorPermission: ["MANAGE_EMOJIS"],
  botPermission: ["MANAGE_EMOJIS"],
  run: async (client, message, args) => {
    const emoji = args[0];
    const name = args.slice(1).join(" ").replace(" ","_").replace("'","_").replace("-","_").replace(".","_").replace("+","_");
    if(!name){return client.send(await client.emoji("DGH_error")+ " hãy đưa tôi tên của Emoji hoặc URL")}
    message.guild.emojis.create(`${emoji}`, `${name}`);
    const Added = new MessageEmbed()
      .setTitle(`Đã thêm Emoji`)
      .setColor(`${Color}`)
      .setDescription(
        `Đã thêm emoji! | Tên emoji : ${name ||
          `${name}`} | Xem trước : [Nhấn vào đây](${emoji})`
      );
    message.delete()
    return message.channel.send(Added);
  }
};
