const discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
  name: "eject",
  description: "Loại bỏ một ai đó khỏi tàu không gian - như Among Ú, SuS",
  usage: "eject <mention hoặc id người dùng>",
  category: "fun",
  run: async (client, message, args) => {
    const user = await client.resolveUser(args[0])
    const imp = [true, false];
    const imposter = imp[Math.floor(Math.random() * imp.length)];
    const crew = ["black", "blue", "brown", "cyan", "darkgreen", "lime", "orange", "pink", "purple", "red", "white", "yellow"]
    const crewmate = crew[Math.floor(Math.random() * crew.length)];
    
    if(!user) {
      return message.channel.send(`${message.author} Hãy đề cập mội người dùng hoặc id của họ để loại!`)
    }
    
    const data = await fetch(`https://vacefron.nl/api//ejected?name=${user.username}&impostor=${imposter}&crewmate=${crewmate}`)
    
    const embed = new discord.MessageEmbed()
      .setAuthor(message.author.username + "#" + message.author.discriminator, message.author.displayAvatarURL())
      .setTitle(`${message.author.username} decided to eject ${user.username}`)
      .setFooter(message.author.username)
      .setColor("BLUE")
      .setDescription(`[Nhấn vào đây nếu như ảnh không load!](${data.url})`)
      .setImage(`${data.url}`)
      .setTimestamp();

    message.channel.send(embed);
  }
}