const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "mute",
  description: "Bịt miệng một ai đó phá luật",
  category: "moderation",
  args: true,
  usage: "mute <@mention> <reason>",
  authorPermission: ["MANAGE_ROLES", "MANAGE_GUILD"],
  botPermission: ["MANAGE_ROLES", "MANAGE_GUILD"],
  run: async (client, message, args) => {
    try {
      var mutee =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find(
          r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
        ) ||
        message.guild.members.cache.find(
          ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()
        );
      if (!mutee)
        return message.channel.send(
          "**Hãy đề cập một người dùng hợp lệ để Mute!**"
        );

      if (mutee === message.member)
        return message.channel.send("**Bạn không thể Mute chính bạn!**");
      if (
        mutee.roles.highest.comparePositionTo(message.guild.me.roles.highest) >=
        0
      )
        return message.channel.send("**Không thể Mute người này!**");

      let reason = args.slice(1).join(" ");
      if (mutee.user.bot) return message.channel.send("**Không thể Mute Bot!**");
      const userRoles = mutee.roles.cache
        .filter(r => r.id !== message.guild.id)
        .map(r => r.id);

      let muterole;
      let dbmute = await client.data.fetch(`muterole_${message.guild.id}`);
      let muteerole = message.guild.roles.cache.find(r => r.name === "Muted");

      if (!message.guild.roles.cache.has(dbmute)) {
        muterole = muteerole;
      } else {
        muterole = message.guild.roles.cache.get(dbmute);
      }

      if (!muterole) {
        try {
          muterole = await message.guild.roles.create({
            data: {
              name: "Muted",
              color: "#514f48",
              permissions: []
            }
          });
      message.guild.channels.cache.forEach(async channel => {
            await channel.createOverwrite(muterole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
              SPEAK: false,
              CONNECT: false
            });
          });
        } catch (e) {
          console.log(e);
        }
      }

      if (mutee.roles.cache.has(muterole.id))
        return message.channel.send("**Người này đã bị Mute rồi!**");

      client.data.set(`muteeid_${message.guild.id}_${mutee.id}`, userRoles);
      try {
        mutee.roles.set([muterole.id]).then(() => {
          mutee
            .send(
              `**Chao Xìn, Bạn đã bị mute ở Server ${
                message.guild.name
              } , Lý do: ${reason || "Không có lý do, có thể là do bạn đen"}**`
            )
            .catch(() => null);
        });
      } catch {
        mutee.roles.set([muterole.id]);
      }
      if (reason) {
        const sembed = new MessageEmbed()
          .setColor("GREEN")
          .setAuthor(message.guild.name, message.guild.iconURL())
          .setDescription(
            `${mutee.user.username} đã bị mute, lý do: ${reason}`
          );
        message.channel.send(sembed);
      } else {
        const sembed2 = new MessageEmbed()
          .setColor("GREEN")
          .setDescription(`${mutee.user.username} đã bị mute`);
        message.channel.send(sembed2);
      }

      let channel = await client.data.fetch(`modlog_${message.guild.id}`);
      if (!channel) return;

      let embed = new MessageEmbed()
        .setColor("RED")
        .setThumbnail(mutee.user.displayAvatarURL({ dynamic: true }))
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
        .addField("**Moderation**", "mute")
        .addField("**Mutee**", mutee.user.username)
        .addField("**Moderator**", message.author.username)
        .addField("**Lý do**", `${reason || "**Không có lý do**"}`)
        .addField("**Ngày**", message.createdAt.toLocaleString())
        .setFooter(
          message.member.displayName,
          message.author.displayAvatarURL()
        )
        .setTimestamp();

      var sChannel = message.guild.channels.cache.get(channel);
      if (!sChannel) return;
      sChannel.send(embed);
    } catch {
      return;
    }
  }
};
