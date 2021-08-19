const Discord = require("discord.js");

module.exports = {
  name: "createembed",
  category: "admin",
  description: "Tạo một tin nhắn Embeds(nhúng) vào kênh kênh chat. Hỗ trợ Embeds!",
  authorPermission: ["MANAGE_MESSAGES"],
  botPermission: ["EMBED_LINKS"],
  run: async (client, message, args) => {
    message.delete();
    message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`Embed Setup | 1/7`)
        .setDescription(
          "Bạn muốn gửi tin nhắn Embeds này vào kênh nào?\nBạn có thể hủy tạo Embeds bất cứ lúc nào bằng cách gõ `cancel`."
        )
        .setColor("RANDOM")
    );
    await startMessageCollectors(client, message, args);
    function startMessageCollectors(client, message, args) {
      let channelFilter = m => m.author.id === message.author.id;
      let channelCollector = new Discord.MessageCollector(
        message.channel,
        channelFilter,
        { max: 999 }
      );

      channelCollector.on("collect", async msg => {
        let channel = await msg.mentions.channels.first();
        if (msg.content.toLowerCase() === "cancel") {
          msg.channel.send("Đã hủy tạo tin nhắn Embeds.");
          channelCollector.stop();
          return;
        }
        if (!channel) {
          await msg.channel.send("Đó không phải là một kênh hợp lệnh! Hủy Tạo Embeds.");
          await channelCollector.stop();
          return;
        } else {
          msg.channel.send(
            new Discord.MessageEmbed()
              .setTitle(`Embed Setup | 2/8`)
              .setDescription(
                `Tin nhắn embeds sẽ dc gửi trong ${channel.toString()}. Bạn muốn tên tiêu đề của embeds là gì?`
              )
              .setColor("RANDOM")
          );
          channelCollector.stop();
        }
        let titleFilter = m => m.author.id === message.author.id;
        let titleCollector = new Discord.MessageCollector(
          message.channel,
          titleFilter,
          { max: 999 }
        );
        titleCollector.on("collect", async msg => {
          let title = msg.content;
          if (msg.content.toLowerCase() === "cancel") {
            msg.channel.send("Thiết lập embeds đã bị hủy.");
            channelCollector.stop();
            return;
          }
          if (!title) {
            await msg.channel.send(`Bạn đã không chỉ định một tiêu đề, hủy thiết lập embeds.`);
            await titleCollector.stop();
          } else {
            msg.channel.send(
              new Discord.MessageEmbed()
                .setTitle(`Embed Setup | 3/8`)
                .setColor("RANDOM")
                .setDescription(
                  `Good! giờ bạn muốn embeds của bạn có màu gì ?(hexcolor hoặc RANDOM)`
                )
            );
            titleCollector.stop();
          }
          let durationFilter = m => m.author.id === message.author.id;
          let durationCollector = new Discord.MessageCollector(
            message.channel,
            durationFilter,
            { max: 999 }
          );
          durationCollector.on("collect", async msg => {
            let duration = msg.content.toUpperCase();
            if (msg.content.toLowerCase() === "cancel") {
              msg.channel.send("Thiết lập embeds đã bị hủy.");
              durationCollector.stop();
              return;
            } else {
              msg.channel.send(
                new Discord.MessageEmbed()
                  .setColor("RANDOM")
                  .setTitle(`Embed Setup | 4/8`)
                  .setDescription(
                    `Màu của embeds sẽ là ${duration}, giờ bạn muốn mô tả của embeds như thế nào ?`
                  )
              );
              durationCollector.stop();
            }
            let winnersFilter = m => m.author.id === message.author.id;
            let winnersCollector = new Discord.MessageCollector(
              message.channel,
              winnersFilter,
              { max: 999 }
            );
            winnersCollector.on("collect", async msg => {
              let trueWinners = msg.content;

              if (msg.content.toLowerCase() === "cancel") {
                msg.channel.send("Thiết lập embeds đã bị hủy.");
                winnersCollector.stop();
                return;
              } else {
                msg.channel.send(
                  new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`Embed Setup | 5/7`)
                    .setDescription(
                      `Good! Giờ, bạn muốn footer của bạn là gì?`
                    )
                );
                winnersCollector.stop();
              }
              let prizeFilter = m => m.author.id === message.author.id;
              let prizeCollector = new Discord.MessageCollector(
                message.channel,
                prizeFilter,
                { max: 999 }
              );
              prizeCollector.on("collect", async msg => {
                let prize = msg.content;
                if (msg.content.toLowerCase() === "cancel") {
                  msg.channel.send("Thiết lập embeds đã bị hủy.");
                  prizeCollector.stop();
                  return;
                }
                if (!prize) {
                  await msg.channel.send(
                    `Bạn đã không chỉ định tên footer, hủy thiết lập embeds!`
                  );
                  prizeCollector.stop();
                  return;
                } else {
                  msg.channel.send(
                    new Discord.MessageEmbed()
                      .setColor("RANDOM")
                      .setTitle(`Embed Setup | 6/7`)
                      .setDescription(
                        `Nice! Bạn có muốn hiển thị thời gian gửi trên embed? gỡ \`yes\` nếu bạn muốn, gõ \`no\` nếu bạn không muốn.`
                      )
                  );
                  prizeCollector.stop();
                }
                let timeFilter = m => m.author.id === message.author.id;
                let timeCollector = new Discord.MessageCollector(
                  message.channel,
                  timeFilter,
                  { max: 999 }
                );
                timeCollector.on("collect", async msg => {
                  if (msg.content.toLowerCase() === "cancel") {
                    msg.channel.send("Thiết lập embeds đã bị hủy.");
                    prizeCollector.stop();
                    return;
                  }
                  if (msg.content.toLowerCase() === "yes") {
                    await msg.channel.send(
                      new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle(`DONE!`)
                        .setDescription(
                          `Sẽ có dấu thời gian cho embeds. Tin nhắn embeds đã được gửi vào ${channel.toString()}.`
                        )
                    );
                    timeCollector.stop();
                    const embed2 = new Discord.MessageEmbed()
                      .setTitle(title)
                      .setColor(duration)
                      .setDescription(trueWinners)
                      .setFooter(prize)
                      .setTimestamp();
                    message.guild.channels.cache.get(channel.id).send(embed2);
                  } else if (msg.content.toLowerCase() === "no") {
                    msg.channel.send(
                      new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle("DONE!")
                        .setDescription(
                          `Sẽ có dấu thời gian cho embeds. Tin nhắn embeds đã được gửi vào ${channel.toString()}.`
                        )
                    );
                    const embed = new Discord.MessageEmbed()
                      .setTitle(title)
                      .setColor(duration)
                      .setDescription(trueWinners)
                      .setFooter(prize);
                    message.guild.channels.cache.get(channel.id).send(embed);
                    timeCollector.stop();
                  }
                });
              });
            });
          });
        });
      });
    }
  }
};
