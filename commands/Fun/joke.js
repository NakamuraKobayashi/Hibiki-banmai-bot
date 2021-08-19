const joke = require('one-liner-joke');
const Discord = require('discord.js');
module.exports = {
        name: "joke",
        usage: `joke`,
        category: "fun",
        description: "Nhận một joke ngẫu nhiên!",
        args: false,
        permission: "",
    run: async (client, message, args) => {
        let jEmbed = new Discord.MessageEmbed()
        .addField("Joke",joke.getRandomJoke().body)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(`Requested by ${message.author.tag}`)
        message.channel.send(jEmbed);
    }}