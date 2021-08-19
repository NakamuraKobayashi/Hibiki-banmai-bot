const { Message, MessageEmbed } = require("discord.js");
//const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
//const db = require("wio.db");
const moment = require("moment");
const fetch = require("node-fetch");

const url = require("url");

module.exports = {
  name: "ss",
  aliases: ["screenshot"],
  category: "search",
  description: "Chụp lại hình ảnh của một trang web.",
  usage: "screenshot <URL>",
  args: true,
  run: async (client, message, args) => {
    message.delete();
    const user = message.author.tag
    const urls = args[0].replace(`pornhub.com`,"❌").replace(`nhentai.net`,"❌").replace('xvideos.com',"❌");
    if (urls.length < 8)
      return message
        .reply(
          "http quá ngắn, ngắn nhất là 8"
        )
        .then(m => m.delete({ timeout: 9000 }).catch(e => {}));

    const site = /^(https?:\/\/)/i.test(urls) ? urls : `http://${urls}`;
    try {
      const { body } = await fetch(
        `https://image.thum.io/get/width/1920/crop/675/noanimate/${site}`
      );
       
      const embed = new Discord.MessageEmbed()
      .setDescription(`\`\`\`\nĐây là hình ảnh được chụp từ URL bạn nhắc đến\n\`\`\``)
      .setColor("RANDOM").setImage("attachment://Screenshot.png")
      .attachFiles([{ attachment: body, name: "Screenshot.png" }]
     );
      return message.channel.send(
     embed);
    } catch (err) {
      if (err.status === 404)
        return message.channel
          .send("Không thể tìm thấy web này. Link không hợp lệ à?")
          .then(m => m.delete({ timeout: 14000 }).catch(e => {}));
      return message
        .reply(`U nuuu, có lỗi xảy raaaa: \`${err.message}\`. Thử lại sau nha bạn :<`)
        .then(m => m.delete({ timeout: 13000 }).catch(e => {}));
    }
  }
};
