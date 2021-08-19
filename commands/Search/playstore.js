const Discord = require("discord.js");
const PlayStore = require("google-play-scraper");
const EmbedColor = `GREEN`;
const db = require("quick.db");
  module.exports = {
  name: "playstore",
  aliases: ["pstore", "googleplaystore", "ps","chplay"],
  description: "Hiển thị thông tin ứng dụng trên GooglePlayStore",
  usage: "playstore <Application Name>",
  category: "search",
  run: async (client, message, args, del) => {
    message.delete();
    if (!args[0])
      return message.channel.send(
        `Hãy điền tên một ứng dụng nào đó để tìm kiếm - ${message.author}`
      );

    PlayStore.search({
      term: args.join(" "),
      num: 1
    }).then(Data => {
      let App;

      try {
        App = JSON.parse(JSON.stringify(Data[0]));
      } catch (error) {
        return message.channel.send(
          `Không tìm thấy ứng dụng nào - ${message.author.username}!`
        );
      }

      let Embed = new Discord.MessageEmbed()
        .setColor(EmbedColor || "RANDOM")
        .setThumbnail(App.icon)
        .setURL(App.url)
        .setTitle(`${App.title}`)
        .setDescription(`\`\`\`\n${App.summary}\n\`\`\``)
        .addField(`Giá`,` \`\`\`\n${App.priceText}\n\`\`\``, true)
        .addField(`Nhà Phát Hành`,`\`\`\`\n ${App.developer}\n\`\`\``, true)
        .addField(`Đánh Giá`,`⭐ ${App.scoreText || "Không có đánh giá ⭐"}`, true)
        .setFooter(`Tìm kiếm bởi ${message.author.username}`)
        .setTimestamp();

      return message.channel.send(Embed).then(m => {

      m.react("✅")

      m.react("❌")

    });
    });
  }
};