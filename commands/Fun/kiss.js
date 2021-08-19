const discord = require("discord.js");
const { Random } = require("something-random-on-discord");

module.exports = {
  name: "kiss",
  category: "fun",
  args: true,
  usage: "kiss <mention hoặc id>",
  description: "hôn một ai đó",
  run: async (client, message, args) => {
    
    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
   
    let data = await Random.getAnimeImgURL("kiss");
    
    let embed = new discord.MessageEmbed()
    .setImage(data)
    .setColor("RANDOM")
    .setFooter(`${message.author.username} Đã hôn ${target.user.username} :33`)
    .setTimestamp()
    
    message.channel.send(embed);
  }
};