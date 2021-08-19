const { MessageEmbed } = require("discord.js");

const math = require("mathjs");

const Color = `RANDOM`;

module.exports = {
  name: "math",
  category: "misc",
  usage: "Toán, 1+1=3 :))",
  args: true,

  run: async (client, message, args) => {
    message.delete();
    try {
      if (!args[0]) return message.channel.send("Hãy đưa tôi phương trình!");

      const embed = new MessageEmbed()
        .setColor(`${Color}`)
        .setTitle(`Result`)
        .setDescription(math.evaluate(args.join(" ")))
        .setTimestamp();
      message.channel.send(embed);
    } catch (error) {
      message.channel
        .send(`Hãy đưa phương trình hợp lệ | Vui lòng thử lại! ("*" là nhân, "/" là chia + - như bình thường`)
        .then(() => console.log(error));
    }
  }
};
