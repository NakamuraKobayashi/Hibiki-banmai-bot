const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("quick.db");
const fs = require("fs");
module.exports = {
  name: "setprefix",
  aliases: ["newprefix", "sp"],
  category: "settings",
  args: true,
  botPermission: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],
  authorPermission: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],
  description: "Set Prefix của bot!",
  usage: "setprefix <Prefix Mới>",
  run: async (client, message, args) => {
    
    let Prefix = await client.data.get(`Prefix_${message.guild.id}`);
    if (!Prefix) Prefix = Default_Prefix;
 
    const NewPrefix = args.join(" ");
    
    if (!NewPrefix) return message.channel.send("Hãy chỉ định Prefix mới cho Bot!").then(m=>m.delete({timeout:5000}).catch(e=>{}));
    
    if (NewPrefix.length > 10) return message.channel.send("Prefix quá dài - giới hạn dài 10 ký tự").then(m=>m.delete({timeout:5000}).catch(e=>{}));
    
    if (NewPrefix === Prefix) return message.channel.send("Prefix này là Prefix hiện tại của bot!").then(m=>m.delete({timeout:5000}).catch(e=>{}));
    
         
    const Embed = new Discord.MessageEmbed()
    .setColor(Color || "RANDOM")
    .setTitle("Thành Công")
    .setDescription(`Prefix mới đã được set thành - ${NewPrefix}`)
    .setFooter(`Set bởi ${message.author.username}`)
    .setTimestamp();
    
    const Embed2 = new Discord.MessageEmbed()
    .setColor(Color || "RANDOM")
    .setTitle("Thành Công")
    .setDescription(`Prefix mới đã được set thành - ${NewPrefix}`)
    .setFooter(`Server ${message.guild.name}\nBởi ${message.author.username}`)
    .setTimestamp();
 const user = client.users.fetch(message.guild.ownerID);
   user.send(Embed2).catch();
    await client.data.set(`Prefix_${message.guild.id}`, NewPrefix);
    
    try {
      return message.channel.send(Embed).then(m=>m.delete({timeout:9000}).catch(e=>{}));
    } catch (error) {
      return message.channel.send(`Prefix mới đã được set thành - ${NewPrefix}`);
    };
  }
};