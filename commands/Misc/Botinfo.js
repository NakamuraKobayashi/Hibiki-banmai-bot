const db = require("quick.db");
const Discord = require ("discord.js")
const { version } = require('../../package.json');
const ms = require('pretty-ms');
const { version: discordjsVersion } = require('discord.js');
module.exports = {

  name: "botinfo",

  category: "misc",
    aliases: ["uptime", "botstats", "stats","stat"],
    description: 'Kiểm tra\'tình trạng\'bot',
  run: async (client, message, args, del, member) => {
   message.delete();
      message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Hibiki Ban Mai Bot`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .addField('Thời gian hoạt động', `${ms(client.uptime)}`, true)
            .addField('WebSocket Ping', `${client.ws.ping}ms`, true)
            .addField('Memory', `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB Heap`, true)
            .addField('Số lượng Servers', `${client.guilds.cache.size} Servers`, true)
            .addField(`Số lượng Người dùng`, `${client.users.cache.size} Người dùng`, true)
            .addField('Commands', `${client.commands.size} lệnh`,true)
            .addField('Node', `${process.version} on ${process.platform} ${process.arch}`, true)
            .addField('Dữ liệu bộ nhớ đệm', `${client.users.cache.size} Người dùng\n${client.emojis.cache.size} emojis`, true)
            .addField('Discord.js', `${discordjsVersion}`, true)
            .setTimestamp()
        );
    }
}