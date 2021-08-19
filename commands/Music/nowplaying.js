const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");

module.exports = {
  name: "nowplaying",
  aliases: ["np"],
  category: "music",
  description: "Thông tin bài hát đang phát!",
  usage: "nowplaying",
  run: async (client, message, args) => {
    const Channel = message.member.voice.channel;

    if (!Channel) return message.channel.send("Vào trong voice đi rồi mới cho xemmm thông tin nha ban iuu :3!");

    const Queue = await client.queue.get(message.guild.id);

    if (!Queue)
      return message.channel.send(
        "Không có bài nào đang phát để xem thông tin đou :D"
      );

    const Song = await Queue.Songs[0],
      Total = Song.Duration,
      Seconds = Song.Seconds,
      Time = parseInt(Queue.Bot.dispatcher.streamTime + Queue.ExtraTime);

    function FD(duration) {
      let minutes = Math.floor(duration / 60);
      let hours = "";
      if (minutes > 59) {
        hours = Math.floor(minutes / 60);
        hours = hours >= 10 ? hours : "0" + hours;
        minutes = minutes - hours * 60;
        minutes = minutes >= 10 ? minutes : "0" + minutes;
      }
      duration = Math.floor(duration % 60);
      duration = duration >= 10 ? duration : "0" + duration;
      if (hours != "") {
        return hours + ":" + minutes + ":" + duration;
      }
      return minutes + ":" + duration;
    };

    const Sec = Math.round(Time / 1000),
      AllTime = (Seconds * 1000).toFixed(0);
    const Remaining = await FD((Seconds - Sec).toFixed(0));
    const Adder = await FD(Sec);
    const Index = Math.round((Time / AllTime) * 20);
    const Bar = "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬".split("");
    let ShowBar;

    if (Index >= 1 && Index <= 20) {
      Bar.splice(Index, 0, "🔵");
      ShowBar = Bar.join("");
    } else {
      ShowBar = "🔵▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬";
    };

    const Data = `Tên Bài - **[${Song.Title}](${Song.Link})**\nKênh - **[${
      Song.Author
    }](${Song.AuthorLink})**\nĐăng tải - **${
      Song.Upload
    }**\nViews - **${Song.Views ||
      0}**\nThời lượng - **${Total}**\nCòn lại - **${Remaining}**\n\n`;

    const Embed = new Discord.MessageEmbed()
      .setColor(Color)
      .setThumbnail(Song.Thumbnail)
      .setTitle("Đang Phát!")
      .setDescription(Data + `${ShowBar}\n${Adder}/${Total}`)
      .setFooter(`Thêm bởi ${Song.Owner}`)
      .setTimestamp();

    return message.channel.send(Embed);
  }
};