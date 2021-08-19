let {
  Token,
  mongodb,
  Default_Prefix,
  Server_ID,
  Support
} = require("../config.js");
module.exports = async client => {
  client.ws.on("INTERACTION_CREATE", async interaction => {
    if (!client.slashcommands.has(interaction.data.name)) return;
    let command = client.slashcommands.get(interaction.data.name);
    if (!command) return;
    let func = {
      id: interaction.guild_id
        ? interaction.member.user.id
        : interaction.user.id,
      user: client.users.resolve(
        interaction.guild_id ? interaction.member.user.id : interaction.user.id
      ),
      channel: client.channels.cache.get(interaction.channel_id),
      guild: interaction.guild_id
        ? client.guilds.cache.get(interaction.guild_id)
        : undefined,
      member: interaction.guild
        ? interaction.guild.members.resolve(interaction.member.user.id)
        : undefined,
      premium: async () => {
        let server = client.guilds.cache.get(Server_ID);
        if (!server) return;
        if (
          !server.members.cache.find(r => r.id === interaction.member.user.id)
        ) {
          const yes = new client.button.MessageButton()
            .setStyle("green")
            .setLabel("Tham gia máy chủ Hỗ Trợ!")
            .setURL(Support);
          const embed = new client.discord.MessageEmbed()
            .setDescription(
              `Lệnh này chỉ dành cho Máy Chủ Premium\nTham gia Máy Chủ Hỗ Trợ để được cấp Premium`
            )
            .setColor("GOLD")
            .setTimestamp();
          message(null, {
            embed: embed,
            buttons: [[yes]],
            flags: 64
          });
          return;
        }
      },
      type: async () => {
        if (client.channels.cache.get(interaction.channel_id).type === "dm") {
          let embed = new client.discord.MessageEmbed()
            .setTitle("⚠️ Lỗi")
            .setDescription(
              "Lệnh này **Chỉ Có Thể** sử dụng **ở trong máy chủ**."
            );

          const yes = new client.button.MessageButton()
            .setStyle("green")
            .setLabel("Tham gia Máy Chủ Hỗ Trợ!")
            .setURL("https://discord.gg/gawrguras");

          const web = new client.button.MessageButton()
            .setStyle("green")
            .setLabel("Dashboard")
            .setURL("https://dgh-bot.ddns.net");
          return message(null, {
            flags: 64,
            embed: embed,
            buttons: [[yes, web]]
          });
        }
      },
      botperms: async function(Perms) {
        let NeededPerms = [];
        Perms.forEach(p => {
          if (
            !client.guilds.cache.get(interaction.guild_id).me.hasPermission(p)
          )
            NeededPerms.push("`" + p + "`");
        });
        if (NeededPerms.length)
          return message(null, {
            flags: 64,
            embed: new client.discord.MessageEmbed()
              .setColor("RED")
              .setTimestamp()
              .setDescription(
                `Tôi cần quyền hạn ${NeededPerms.join(
                  ", "
                )} để có thể thực hiện lệnh này!`
              )
          });
      },
      perms: async function(perms) {
        let neededPerms = [];
        perms.forEach(p => {
          if (
            !interaction.guild.members
              .resolve(interaction.member.user.id)
              .hasPermission(p)
          )
            neededPerms.push("`" + p + "`");
        });
        if (neededPerms.length)
          return message(null, {
            flags: 64,
            embed: new client.discord.MessageEmbed()
              .setColor("RED")
              .setTimestamp()
              .setDescription(
                `Bạn không có quyền hạn để sử dụng lệnh này.\nLệnh này cần quyền ${neededPerms.join(
                  ", "
                )}`
              )
          });
      }
    };
    try {
      command.execute(client, message, func, interaction.data.options);
    } catch (error) {
      console.error(
        `🟥 Error Slash Command: ${interaction.data.name} | ${error.message}`
      );
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            flags: 64,
            content: `Xin lỗi, đã có lỗi khi sử dụng lệnh này!`
          }
        }
      });
    }
    async function message(
      content,
      {
        embed,
        files,
        tts,
        allowed_mentions,
        flags,
        ephemeral,
        buttons = []
      } = {}
    ) {
      let components = [];
      for (let buttonArray of buttons) {
        components.push({ type: 1, components: buttonArray });
      }
      return client.api
        .interactions(interaction.id, interaction.token)
        .callback.post({
          data: {
            type: 4,
            data: {
              content,
              embeds: [embed],
              files,
              tts,
              allowed_mentions,
              flags: ephemeral ? 64 : flags,
              components
            }
          }
        });
    }
  });
};
/*

      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            flags: 64,
            embed: embed,
            buttons: [[yes, web]]
          }
        }
      });
    }*/
