const db = require("quick.db");

module.exports = {
  name: "setmuterole",
  aliases: ["setmute", "smrole", "smr"],
  description: "Đặt một role Mute!",
  usage: "[role name | role mention | role ID]",
  botPermission: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],
  authorPermission: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],
  category: "settings",
  run: async (client, message, args) => {
    const bot = client;
    if (!args[0]) {
      let b = await client.data.fetch(`muterole_${message.guild.id}`);
      let roleName = message.guild.roles.cache.get(b);
      if (message.guild.roles.cache.has(b)) {
        return message.channel.send(
          `**Role Mute của server này sẽ là Role \`${roleName.name}\`!**`
        );
      } else
        return message.channel.send(
          "**Hãy đề cập một Role hoặc ID role!**"
        );
    }

    let role =
      message.mentions.roles.first() ||
      bot.guilds.cache.get(message.guild.id).roles.cache.get(args[0]) ||
      message.guild.roles.cache.find(
        c => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
      );

    if (!role)
      return message.channel.send("**Hãy đề cập một Role hoặc ID role hợp lệ!**");

    try {
      let a = await client.data.fetch(`muterole_${message.guild.id}`);

      if (role.id === a) {
        return message.channel.send(
          "**Role này đã là Mute Role rồi mà :v!**"
        );
      } else {
        client.data.set(`muterole_${message.guild.id}`, role.id);

        message.channel.send(
          `Role **\`${role.name}\` Đã được set làm Mute Role!**`
        );
      }
    } catch (e) {
      return message.channel.send(
        "**Lỗi - `Thiếu quyền hoặc Role không hợp lệ!`**",
        `\n${e.message}`
      );
    }
  }
};
