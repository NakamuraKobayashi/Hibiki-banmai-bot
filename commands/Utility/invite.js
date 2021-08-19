const Discord = require("discord.js");
const db = require("quick.db");
const {
  Owner,
  Developer,
  Support,
  Dashboard,
  Server_ID
} = require("../../config.js");
module.exports = {
  name: "invite",
  aliases: ["invitelink", "vote"],
  category: "utility",
  description: "Đưa cho bạn link mời của tôi!",
  usage: "Invite",
  guildOnly: true,
  cooldown: 5,
  run: async (client, message, args) => {
    message.delete();
    const embed = new Discord.MessageEmbed()
       .setColor("GREEN")
        .setTitle("🙏Cảm Ơn🙏")
        .addField(
          "Mời tôi",
         `[Nhấn vào đây](https://discord.com/oauth2/authorize?client_id=873867519784550441&permissions=8&scope=bot)`)
        .addField("Support Server", `[Nhấn Vào Đây](${Support})`)
        if(Dashboard) embed.addField("Dashboard", `[Dashboard hiện chưa có](${Dashboard})`);
        embed.addField("Owner", `<@${Owner}>`)
        .addField("Developer", `<@${Developer}>`)
        .setImage(
          `https://discordapp.com/api/guilds/${Server_ID}/embed.png?style=banner2`
        );
  
const yes = new client.button.MessageButton()
        .setStyle("green")
        .setLabel("Tham gia máy chủ hỗ trợ!")
        .setEmoji(await client.emoji("DGH_link","id"))
        .setURL(Support);
    
const web = new client.button.MessageButton()
        .setStyle("green")
        .setLabel("Website")
        .setEmoji(await client.emoji("DGH_link","id"))
        .setURL("https://hibiki.banmai.repl.co/");
   
    client.button.send(null, {
      channel: message.channel.id,
      embed: embed,
      buttons: [[yes, web]]
    });
}
};
