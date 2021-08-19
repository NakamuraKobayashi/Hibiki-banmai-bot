const { Default_Prefix, Color } = require("../../config.js");
const { Player, Objector } = require("../../Functions.js");
const Discord = require("discord.js");
const db = require("quick.db"),
  Sr = require("youtube-sr"),
  Ytdl = require("discord-ytdl-core");

module.exports = {
  name: "search",
  aliases: ["sr", "tìm"],
  category: "music",
  description: "Tìm nhạc!",
  usage: "search <song name>",
  run: async (client, message, args) => {
    const Channel = message.member.voice.channel;

    if (!Channel) return message.channel.send("Bạn phải vào voice để tìm kiếm!");
    if (!args[0]) return message.channel.send("Bạn phải đưa ra tên bài để tìm kiếm!");

    const Queue = await client.queue.get(message.guild.id);

    if (
      !Channel.permissionsFor(message.guild.me).has("CONNECT") ||
      !Channel.permissionsFor(message.guild.me).has("SPEAK")
    )
      return message.channel.send(
        "Ban Mai không có quyền để phát nhạc (Quyền thiếu: Kết nối , Nói)"
      );

    if (!Channel.joinable)
      return message.channel.send("Ban Mai không vào Voice được!");

    await Sr.search(args.join(" "), { limit: 10 }).then(async Data => {
      if (!Data[0].id)
        return message.channel.send(
          "Lỗi: đã có lỗi xảy ra hoặc không tìm thấy video nào"
        );
      const All = await Data.map(
          (Video, Position) =>
            `${Position + 1}. **[${
              Video.title.length > 100 ? Video.title + "..." : Video.title
            }](https://youtube.com/watch?v=${Video.id})**`
        ),
        Filter = m => m.author.id === message.author.id;
      
      const Embed = new Discord.MessageEmbed()
      .setColor(Color)
      .setTitle("Hãy chọn")
      .setDescription(All)
      .setFooter("Lựa chọn số từ 1 - 10, Thời gian outtime: 5 Phút")
      .setTimestamp();
      
      message.channel.send(Embed).catch(() => message.channel.send(`Lựa chọn số từ 1 - 10, Thời gian outtime: 5 Phút\n\n${All}`))

      await message.channel
        .awaitMessages(Filter, { max: 1, time: 300000, errors: ["thời gian"] })
        .then(async Msg => {
          let Content = parseInt(Msg.first().content),
            SongInfo = null,
            Song = null;
          Msg = Msg.first();
          if (isNaN(Content))
            return message.channel.send(
              "Số không hợp lệ, Hủy tìm kiếm"
            );
          if (Content - 1 > All.length || !All[Content])
            return message.channel.send(
              "Số không hợp lệ, Hủy tìm kiếm"
            );

          try {
            const Find = await Data.find(Dat => Dat === Data[Content - 1]);
            console.log(Find);
            const YtInfo = await Ytdl.getInfo(
              `https://youtube.com/watch?v=${Find.id}`
            );
            SongInfo = YtInfo.videoDetails;
            Song = await Objector(SongInfo, message);
          } catch (error) {
            console.log(error)
            return message.channel.send("Lỗi: đã có lỗi xảy ra");
          }

          let Joined;
          try {
            Joined = await Channel.join();
              Channel.guild.voice.setSelfDeaf(true);
  } catch (error) {
            console.log(error);
            return message.channel.send(
              "Lỗi: Ban Mai không thể vào voice :<"
            );
          }

          if (Queue) {
            const Embed = new Discord.MessageEmbed()
              .setColor(Color)
              .setTitle("Đã thêm bài!")
              .setThumbnail(Song.Thumbnail)
              .setDescription(
                `[${Song.Title}](${Song.Link}) đã được thêm vào hàng chờ!`
              )
              .setTimestamp();
            await Queue.Songs.push(Song);
            return message.channel
              .send(Embed)
              .catch(() =>
                message.channel.send("Bài hát đã được thêm vào hàng chờ!")
              );
          }

          const Database = {
            TextChannel: message.channel,
            VoiceChannel: Channel,
            Steam: null,
            Bot: Joined,
            Songs: [],
            Filters: {},
            Volume: 100,
            Loop: false,
            Always: false,
            Playing: true
          };

          await client.queue.set(message.guild.id, Database);

          await Database.Songs.push(Song);

          try {
            await Player(message, Discord, client, Ytdl, {
              Play: Database.Songs[0],
              Color: Color
            }, db);
          } catch (error) {
            console.log(error);
            await client.queue.delete(message.guild.id);
            await Channel.leave().catch(() => {});
            return message.channel.send(
              "Lỗi: đã có lỗi xảy ra từ phía bot"
            );
          }
        });
    });
  }
};