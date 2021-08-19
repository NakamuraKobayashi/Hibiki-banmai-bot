const { Default_Prefix, Color } = require("../../config.js");
const { GetRegxp, Linker, Objector, Player } = require("../../Functions.js");
const Discord = require("discord.js"), Sr = require("youtube-sr").default, syt = require("scrape-yt"), Ytdl = require("discord-ytdl-core"), db = require("quick.db");

module.exports = {
  name: "play",
  aliases: ["p"],
  category: "music",
  description: "Phát nhạc với link | ID video youtube (Tìm bằng tên hiện đang gặp lỗi)!",
  usage: "Play <Song Link | Song ID | Playlist Link>",
  args: true,
  cooldown: 5 ,
 run: async (client, message, args) => {
    const Channel = message.member.voice.channel;
    if (!Channel)
      return message.channel.send("Hãy vào voice trước rồi mới phát nhạc được nhé bạn ưi :3!");
    if (!args[0])
      return message.channel.send(
        "Hãy chỉ định :\nYoutube Video (Link - ID) , Youtube Playlist (Link - ID)"
      );
    if (
      !Channel.permissionsFor(message.guild.me).has("CONNECT") ||
      !Channel.permissionsFor(message.guild.me).has("SPEAK")
    )
      return message.channel.send(
        "Ban Mai hông có đủ quyền để vào voice :< (Quyền thiếu: Kết nối , Nói)"
      );
    
    if (!Channel.joinable) return message.channel.send("Ban Mai không vào được Voice này <:puddingangry:864826668577193994> !");

    const YtID = await GetRegxp("YtID"),
      YtUrl = await GetRegxp("YtUrl"),
      YtPlID = await GetRegxp("YtPlID"),
      YtPlUrl = await GetRegxp("YtPlUrl"),
      Base = await Linker("Base");
    let Song = null,
      SongInfo = null,
      Playlist = null;
    const ServerQueue = await client.queue.get(message.guild.id);

    if (YtID.test(args[0])) {
      try {
        const Link = await Linker(args[0]);
        const Info = await Ytdl.getInfo(Link);
        SongInfo = Info.videoDetails;
        Song = await Objector(SongInfo, message);
      } catch (error) {
        console.log(error);
        return message.channel.send("Lỗi: Không tìm thấy video này! (ID)!");
      }
    } else if (YtUrl.test(args[0]) && !args[0].toLowerCase().includes("list")) {
      try {
        const Info = await Ytdl.getInfo(args[0]);
        SongInfo = Info.videoDetails;
        Song = await Objector(SongInfo, message);
      } catch (error) {
        console.log(error);
        return message.channel.send(
          "Lỗi: Đã có lỗi xảy ra hoặc không tìm thấy video nào! (Link)!"
        );
      }
    } else if (
      YtPlID.test(args[0]) &&
      !args[0].toLowerCase().startsWith("http")
    ) {
      try {
        const Info = await syt.getPlaylist(args[0]);
        const YtInfo = await Ytdl.getInfo(
          `https://www.youtube.com/watch?v=${Info.videos[0].id}`
        );
        SongInfo = YtInfo.videoDetails;
        Song = await Objector(SongInfo, message);
        const Arr = [];
        for (const Video of Info.videos) {
          const Infor = await Ytdl.getInfo(
            `https://www.youtube.com/watch?v=${Video.id}`
          );
          const Detail = Infor.videoDetails;
          await Arr.push(await Objector(Detail, message));
        }
        Playlist = {
          Yes: true,
          Data: Arr
        };
      } catch (error) {
        console.log(error);
        return message.channel.send(
          "Lỗi: Có gì đó sai sai, có thể là ID playlist không đúng hoặc playlist riêng tư hoặc không có video nào trong playlist (ID)!"
        );
      }
    } else if (YtPlUrl.test(args[0])) {
      try {
        const Splitter = await args[0].split("list=")[1];
        console.log(Splitter);
        const Info = await syt.getPlaylist(
          Splitter.endsWith("/") ? Splitter.slice(0, -1) : Splitter
        );
        const YtInfo = await Ytdl.getInfo(
          `https://www.youtube.com/watch?v=${Info.videos[0].id}`
        );
        SongInfo = YtInfo.videoDetails;
        Song = await Objector(SongInfo, message);
        const Arr = [];
        for (const Video of Info.videos) {
          const Infor = await Ytdl.getInfo(
            `https://www.youtube.com/watch?v=${Video.id}`
          );
          const Detail = Infor.videoDetails;
          await Arr.push(await Objector(Detail, message));
        }
        Playlist = {
          Yes: true,
          Data: Arr
        };
      } catch (error) {
        console.log(error);
        return message.channel.send(
          "Lỗi: Có gì đó sai sai, có thể là Link playlist không đúng hoặc playlist riêng tư hoặc không có video nào trong playlist (URL)!"
        );
      }
    } else {
      try {
        await Sr.search(args.join(" ")).then(async Info => {
           const YtInfo = await Ytdl.getInfo(`https://www.youtube.com/watch?v=${Info.id}`);
          SongInfo = YtInfo.videoDetails;
          Song = await Objector(SongInfo, message);
        });
      } catch (error) {
        console.log(error);
        return message.channel.send(
          "Lỗi: Có vẻ như đã có lỗi, hiện tại tìm kiếm bằng tên bàn hát không khả dụng, hãy thử bằng link hoặc ID nhé !"
        );
      };
    };

    let Joined;
    try {
      Joined = await Channel.join();
      Channel.guild.voice.setSelfDeaf(true);
     } catch (error) {
      console.log(error);
      return message.channel.send("Lỗi: Ban Mai hông thể vào voice :<!");
    };

    if (ServerQueue) {
      if (Playlist && Playlist.Yes) {
        const Embed = new Discord.MessageEmbed()
          .setColor(Color)
          .setTitle("Đã thêm danh sách phát!")
          .setThumbnail(Playlist.Data[0].Thumbnail)
          .setDescription(
            `[Playlist](${
              args[0].includes("http")
                ? args[0]
                : `https://www.youtube.com/playlist?list=${args[0]}`
            }) Đã được thêm vào hàng chờ!`
          )
          .setTimestamp();
        await Playlist.Data.forEach(async Video => {
          try {
            await ServerQueue.Songs.push(Video);
          } catch (error) {
            await Channel.leave().catch(() => {});
            return message.channel.send(
              "Lỗi: Đã có lỗi phát sinh từ phía của bot, hãy báo cáo lại bằng lệnh 'niji!bug <nêu lỗi>' nhé!"
            );
          }
        });
        return message.channel
          .send(Embed)
          .catch(() =>
            message.channel.send("Playlist đã được thêm vào hàng chờ")
          );
      } else {
        const Embed = new Discord.MessageEmbed()
          .setColor(Color)
          .setTitle("Đã thêm bài hát!")
          .setThumbnail(Song.Thumbnail)
          .setDescription(
            `[${Song.Title}](${Song.Link}) Đã được thêm vào hàng chờ!`
          )
          .setTimestamp();
        await ServerQueue.Songs.push(Song);
        return message.channel
          .send(Embed)
          .catch(() => message.channel.send("Đã thêm video này vào hàng chờ!"));
      }
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

    if (Playlist && Playlist.Yes) {
      await Playlist.Data.forEach(ele => Database.Songs.push(ele));
    } else {
      await Database.Songs.push(Song);
    };

    try {
      await Player(message, Discord, client, Ytdl, { Play: Database.Songs[0], Color: Color }, db);
    } catch (error) {
      console.log(error);
      await client.queue.delete(message.guild.id);
      await Channel.leave().catch(() => {});
      return message.channel.send(
        "Lỗi: Đã có lỗi phát sinh từ phía của bot, hãy báo cáo lại bằng lệnh 'niji!bug <nêu lỗi>' nhé!"
      );
    }
  }
};