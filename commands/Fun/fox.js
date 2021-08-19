const Discord = require("discord.js");
const fetch = require('node-fetch');
module.exports = {
        name: "fox",
        aliases: ["cáo"],
        usage: ``,
        category: "fun",
        description: "Một ảnh ngẫu nhiên về Cáo",
        args: false,
        cooldown: 9,
        permission: "",
    run: async (client, message, args) => {
//code
     const response = await fetch('https://randomfox.ca/floof/');
        const { image } = await response.json();
        message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription('https://randomfox.ca/')
            .setImage(image)
        );
    }
}