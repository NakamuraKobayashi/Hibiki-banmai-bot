const Discord = require("discord.js");
const { Message, MessageEmbed } = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const { readdirSync } = require("fs");
const category = new Discord.Collection();
category.set("misc", "**Misc Commands**");
category.set("utility", "**Utility Commands**");
category.set("moderation", "**Moderation Commands**");
category.set("settings", "**Settings Commands**");
category.set("ticket", "**Ticket Commands**");
category.set("reaction", "**ReactionRoles Commands**");

category.set("admin", "**Admin Commands**");
category.set("music", "**Music Commands For Member**");
category.set("search", "**Search Commands**");
category.set("fun", "**Fun Commands**");
category.set("yt_poster","** YT Poster Commands**");
module.exports = {
  name: "help",
  description:
    "Liệt kê tất cả các lệnh của tôi hoặc hiển thị thông tin về một lệnh cụ thể.",
  category: "utility",
  usage: "help [lệnh | thể loại]",
  cooldown: 5,
  run: async (client, message, args) => {
    /**
     * @returns {Promise<Message|boolean>}
     * @param {Client} client
     * @param {Message} message
     * @param {Array<string>} args
     */
    const prefix = await client.data.get(`Prefix_${message.guild.id}`);
    message.delete().catch(O_o => {}); // eslint-disable-line
    let database = await client.data.get(`cmd_${message.guild.id}`);
    const cc = args[0];
    if (args.length) {
      if (category.has(cc)) {
        let embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTimestamp()
          .setDescription(
            `${category.get(cc)}\n\`\`\`xl\nhelp [lệnh]\n\`\`\``
          )
          .addField(
            `Các lệnh:`,
            `${client.commands
              .filter(command => command.category.includes(cc))
              .map(command => `\`${command.name}\``)
              .join(", ")}` || `\u200b`
          );
        return message.channel.send(embed);
      }
    }
    if (args[0] === "custom") {
      let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setDescription(`Lệnh tùy chỉnh\n\`\`\`xl\nhelp [Lệnh]\n\`\`\``);
      if (database && database.length) {
        let array = [];
        database.forEach(m => {
          array.push("`" + m.name + "`");
        });
        embed.addField("Các lệnh:", array.join(", ") || `\u200b`);
      }
      return message.channel.send(embed);
    }

    const name = args[0];
    const command =
      client.commands.get(name) ||
      client.commands.find(c => c.aliases && c.aliases.includes(name));
    if (!command) {
    } else {
      let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`Lệnh **\`${command.name}\`**`)
        .setDescription(`\`${command.description || "Không có mô tả"}\``)
        .addField(`Thể loại`, `• \`${command.category || "--"}\``, true)
        .addField(
          `Các tên gọi khác`,
          `\`\`\`html\n${"Không có tên gọi khác" ||
            command.aliases.join(", ") ||
            "Không có tên gọi khác"}\n\`\`\``,
          true
        )
        .addField(
          `Yêu cầu quyền hạn`,
          `\`\`\`html\n${command.permissions ||
            command.permission ||
            command.botPermission ||
            "Không có quyền"}\n\`\`\``,
          false
        )
        .addField(
          `Sử dụng kèm`,
          `\`\`\`html\n${command.usage || "Không sử dụng kèm"}\n\`\`\``,
          false
        );
      return message.channel.send(embed);
    }
    let em = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setTitle("Danh Sách Các Lệnh ")
      .setDescription(
        `🛡️ Tham gia máy chủ hỗ trợ để được hỗ trợ và cập nhật!\n\`\`\`xl\n${prefix || "niji!"}help [Thể loại]\n\`\`\``
      )
      .addField(
        `${client.emotes.moderation || "⚙️"} Quản lý Viên`,
        `\`moderation\``,
        true
      )
      .addField(
        `${client.emotes.settings || "🔧"} Cài đặt`,
        `\`settings\``,
        true
      )
      .addField(`${client.emotes.admin || "🔗"} Admin`, `\`admin\``, true)
      .addField(`${client.emotes.ticket || "🎟️"} Ticket`, `\`ticket\``, true)
      .addField(`${client.emotes.utility || "📜"} Thiết thực`, `\`utility\``, true)
      .addField(`${client.emotes.search || "🔍"} Tìm kiếm`, `\`search\``, true)
      .addField(`${client.emotes.misc || "📋"} Linh tinh`, `\`misc\``, true)
      .addField(`${client.emotes.music || "🎶"} Âm nhạc`, `\`music\``, true)
      .addField(
        `${client.emotes.add || "✅"} Reaction Roles`,
        `\`reaction\``,
        true
      )
      .addField(
        `${client.emotes.yt || "📣"} Thông báo Youtube`,
        `\`yt_poster\``,
        true
      )
      .addField(`${client.emotes.fun || "😂"} Hài hước`, `\`fun\``, true);
     if (database && database.length) {
       em.addField("➖ Tùy chỉnh lệnh", `\`custom\``, true);
    }
    em.setImage(
      "https://cdn.discordapp.com/attachments/829696536396955649/856380297851830272/standard_6.gif"
    ).setTimestamp();
  
const web = new client.button.MessageButton()
        .setStyle("green")
        .setLabel("Website")
        .setEmoji(await client.emoji("DGH_link","id"))
        .setURL("https://hibiki.banmai.repl.co/");
   const invite = new client.button.MessageButton()
        .setStyle("green")
        .setLabel("Mời Tôi")
        .setEmoji(await client.emoji("DGH_link","id"))
        .setURL("https://discord.com/oauth2/authorize?client_id=873867519784550441&permissions=8&scope=bot");
   
    return client.button.send(null, {
      channel: message.channel.id,
      embed: em,
      buttons: [[invite, web]]
    });
  }
};