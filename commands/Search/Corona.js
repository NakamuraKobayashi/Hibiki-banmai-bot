const { Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const moment = require("moment");
const fetch = require("node-fetch");
const url = require("url");
const api = require ("covidapi")
module.exports = {
  name: "covid",
  aliases: ["Covid-19"],
  category: "search",
  description: "Covid-19",
  usage: "covid <country>",
  args: true,
  run: async (client, message, args) => {
    message.delete();
    const a = args.join(" ")
   const data = await api.countries({country: args.join(" ")})
    const coronaembed = new Discord.MessageEmbed()
    .setColor("#00f8ff")
    .setTitle("Các ca mắc Covid 19 trên thế giới")
    .setDescription(`Các ca mắc Covid 19 ở \`${a}\``)
    .addField("Tổng ca mắc", data.cases, true)
    .addField("Chuyển biến tích cực", data.active, true)
    .addField("Ca mắc hôm nay", data.todayCases, true)
    .addField("Các trường hợp nghiêm trọng", data.critical, true)
    .addField("Số người tử vong", data.deaths, true)
    .addField("Phục hồi", data.recovered, true)
    message.channel.send(coronaembed)
  }} 