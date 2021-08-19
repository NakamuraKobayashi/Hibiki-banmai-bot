const canvacord = require('canvacord');
module.exports = {
  name: "comment",
  description: "một ảnh như comment trên youtube",
  usage: "comment <văn bản>",
  category: "fun",
  run: async (client, message, args) => {
  	const comment = args.join('');
        if(!comment) return message.channel.send(`${client.emotes.error} Hãy chỉ định một cái gì đó để Comment!`)
        try {    
        let yt = await canvacord.Canvas.youtube({"avatar":message.author.displayAvatarURL({format: "png"}),"username":message.author.username, "content":args.join(" ")})
        let attachment = new client.discord.MessageAttachment(yt, 'comment.png')
        message.channel.send(attachment)
    }catch(err) {
        const embed2 = new Discord.MessageEmbed()
    .setTitle(`${client.emotes.error} có gì đó sai sai\n${client.emotes.error}Note : lệnh này sẽ không hoạt động khi người dùng để tên là khoảng trống.`)
    .setColor("RANDOM")
    message.channel.send(embed2)
    }

    }
}