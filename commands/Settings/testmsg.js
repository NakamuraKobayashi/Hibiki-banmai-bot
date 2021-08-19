const Canvas = require("canvas");
const Discord = require("discord.js");
const db = require("quick.db");
const moment = require("moment-timezone");
module.exports = {
  name: "test",
  usage: `test <key // welcome/leave`,
  category: "settings",
  description: "Test tin nhắn chào mừng hoặc tin nhắn rời server",
  args: false,
  cooldown: 2,
 botPermission: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],
  authorPermission: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],
   run: async (client, message, args) => {
    const [key, ...value] = args;
    switch (key) {
      default:
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("RED")
            .setTimestamp()
            .setFooter(
              message.author.tag,
              message.author.displayAvatarURL({ dynamic: true }) ||
                client.user.displayAvatarURL({ dynamic: true })
            )
            .setDescription("Lỗi: Từ khóa không hợp lệ.")
        );

      case "leave":
        {
          const remove = await client.emit("guildMemberRemove", message.member);
          if (!remove) {
            message.channel.send(
              "Không có tin nhắn rời nào cả, hãy cài đặt trước bằng command \`niji!setchannel\`"
            );
          }
          if(remove) {
      client.send("Kiểm tra thành công!", message)
          };
        	
        }

        break;
      case "welcome": {
        const add = await client.emit("guildMemberAdd", message.member);
        if (!add) {
          message.channel.send("Không có tin nhắn chào mừng nào cả, hãy cài đặt trước bằng command \`niji!setchannel\`");
        }
          if(add) {
      client.send("Kiểm tra thành công!", message)
          };
      }
    }
  }
};
