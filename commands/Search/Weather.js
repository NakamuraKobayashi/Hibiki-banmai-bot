const weather = require('weather-js');
const discord = require('discord.js')

module.exports = {
  name: "weather",
  aliases: ["thời-tiết"],
  description: "Thông tin thời tiết ở mọi nơi!",
  category: "search",
  usage: "weather|thời-tiết <tên thành phố/quốc gia>",
  args: true,
  run: (client, message, args) => {
    
    
    if(!args.length) {
      return message.channel.send("Hãy chỉ ra khu vực bạn muốn xem thời tiết")
    }
    
 weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
try {
 
let embed = new discord.MessageEmbed()
.setTitle(`Thời tiết ở - ${result[0].location.name}`)
.setColor("#ff2050")
.setDescription("Nhiệt độ đôi khi sẽ khác nhau")
.addField("Nhiệt Độ", `${result[0].current.temperature} °C`, true)
.addField("Trời", result[0].current.skytext, true)
.addField("Độ ẩm", `${result[0].current.humidity}%`, true)
.addField("Tốc độ gió", result[0].current.windspeed, true)//What about image
.addField("Thời gian cập nhật", result[0].current.observationtime, true)
.addField("Hướng Gió", result[0].current.winddisplay, true)
.setThumbnail(result[0].current.imageUrl);
   message.channel.send(embed)
} catch(err) {
  return message.channel.send("Không thể lấy dữ liệu thời tiết ở vùng này")
}
});   
    //LETS CHECK OUT PKG
    
  }
}
