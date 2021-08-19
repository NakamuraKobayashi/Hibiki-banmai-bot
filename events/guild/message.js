let {
  Token,
  mongodb,
  Default_Prefix,
  Server_ID,
  Support
} = require("../../config.js");
let Discord = require("discord.js");
let MessageEmbed = Discord.MessageEmbed;

const format = require(`humanize-duration`);
const ms = require("pretty-ms");
const cooldowns = new Discord.Collection();

module.exports = async client => {

  client.on("message", async message => {
    if (message.author.bot || !message.guild || message.webhookID) return;
    let Prefix = await client.data.get(`Prefix_${message.guild.id}`);
    if (!Prefix) Prefix = Default_Prefix;
    const escapeRegex = str =>
      str.replace(/[.<>`•√π÷×¶∆£¢€¥*@_+?^${}()|[\]\\]/g, "\\$&");
    const prefixRegex = new RegExp(
      `^(<@!?${client.user.id}>|${escapeRegex(Prefix)})\\s*`
    );
    if (!prefixRegex.test(message.content)) return;
    const [, matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content
      .slice(matchedPrefix.length)
      .trim()
      .split(/ +/);
    let cmd = args.shift().toLowerCase();

    let cmdx = await client.data.get(`cmd_${message.guild.id}`);
    if (cmdx) {
      let cmdy = cmdx.find(x => x.name === cmd);
      if (cmdy) message.channel.send(cmdy.responce);
    }

    let command =
      client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (!command) return;
    if (command)
      console.log(
        `${message.author.username} [${message.guild.name}] Command ${cmd}`
      );
    const yes = new client.button.MessageButton()
      .setStyle("green")
      .setLabel("Tham gia máy chủ Hỗ Trợ!")
      .setURL(Support);
    if (command.enabled === false) {
      const embed = new Discord.MessageEmbed()
        .setDescription(`Lệnh này đã bị Vô Hiệu Hóa.`)
        .setColor("RED")
        .setTimestamp();
      client.button.send(null, {
        channel: message.channel.id,
        embed: embed,
        buttons: [[yes]]
      });
      return;
    }
    if (command.premium === false) {
      let server = client.guilds.cache.get(Server_ID);
      if (!server) return;
      if (!server.members.cache.find(r => r.id === message.author.id)) {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            `Lệnh này chỉ có Máy Chủ Premium mới sử dụng được\nHãy tham gia máy chủ Hỗ Trợ để được cấp Premium`
          )
          .setColor("GOLD")
          .setTimestamp();
        client.button.send(null, {
          channel: message.channel.id,
          embed: embed,
          buttons: [[yes]]
        });
        return;
      }
    }
    
    if (command.args && !args.length) {
      return message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setTimestamp()
          .setDescription(
            `Bạn đã không cung cấp bất kỳ đối số nào, ${
              message.author
            }!\nCách sử dụng thích hợp sẽ là: \n\`\`\`html\n${command.usage ||
              "Không có sử dụng kèm"}\n\`\`\`Mô tả:\`\`\`html\n${command.description ||
              "Không có mô tả"}\n\`\`\``
          )
      );
    }
    
    if (command.botPermission) {
      let neededPerms = [];
      command.botPermission.forEach(p => {
        if (!message.guild.me.hasPermission(p)) neededPerms.push("`" + p + "`");
      });
      if (neededPerms.length)
        return message.channel.send(
          new MessageEmbed()
            .setColor("RED")
            .setTimestamp()
            .setDescription(
              `Tôi cần có quyền hạn ${neededPerms.join(
                ", "
              )} để có thể thực hiện lệnh này!`
            )
        );
    }
    if (command.authorPermission) {
      let neededPerms = [];
      command.authorPermission.forEach(p => {
        if (!message.member.hasPermission(p)) neededPerms.push("`" + p + "`");
      });
      if (neededPerms.length)
        return message.channel.send(
          new MessageEmbed()
            .setColor("RED")
            .setTimestamp()
            .setDescription(
              `Bạn không có quyền để sử dụng lệnh này.\nLệnh này cần quyền ${neededPerms.join(
                ", "
              )}`
            )
        );
    }

   
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.channel.send(
          new MessageEmbed()
            .setColor("RED")
            .setTimestamp()
            .setDescription(
              `${client.emotes.error} Vui lòng chờ **${ms(
                timeLeft
              )}** trước khi sử dụng lại lệnh.`
            )
        );
      }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    if (command) {
      try {
        command.run(client, message, args);
      } catch (error) {
        const errrr = new MessageEmbed()
          .setColor("RED")
          .setTimestamp()
          .setDescription(
            `Đã có lỗi xảy ra khi thực hiện lệnh này\nError Message: \`${
              error.message ? error.message : error
            }\``
          );
        return message.channel
          .send(errrr)
          .then(m => m.delete({ timeout: 13000 }).catch(e => {}));
      }
    }
  });
};
