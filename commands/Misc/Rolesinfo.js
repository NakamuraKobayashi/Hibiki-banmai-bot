const { MessageEmbed } = require("discord.js");

module.exports = {
        name: 'roleinfo',
        description: "Hiển thị thông tin về Role",
        usage: "roleinfo <role mention/role id>",
        aliases: ['rinfo', 'rolei'],
        args: true,
        category: "misc",
    run: async (client, message, args) => {
      const bot = client
        if (!args[0]) return message.channel.send("**Hãy đề cập một Role hoặc ID role (khuyến nghị dùng ID role để tránh làm phiền)!**")
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
        if (!role) return message.channel.send("**Hãy đề cập một role hợp lệ hoặc ID role hợp lệ!**");

        const status = {
            false: "Không",
            true: "Có"
        }

        let roleembed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Thông Tin Role: \`[  ${role.name}  ]\``)
            .setThumbnail(message.guild.iconURL())
            .addField("**ID**", `\`${role.id}\``, true)
            .addField("**Tên Role**", role.name, true)
            .addField("**Mã Hex**", role.hexColor, true)
            .addField("**Màu**", role.color, true)
            .addField("**Số người có role**", role.members.size, true)
            .addField("**Vị trí role**", role.position, true)
  //          .addField("**Permissions**", role.permission.join(", "), true)
            .addField("**Cho phép đề cập**", status[role.mentionable], true)
            .setFooter(message.member.displayName, message.author.displayAvatarURL(), true)
            .setTimestamp()

        message.channel.send(roleembed);
    }
}