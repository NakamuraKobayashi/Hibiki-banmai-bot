const Discord = module.require("discord.js");

module.exports = {
   name: "lock",
   description: "Khóa một kênh",
   aliases: ["khóa"],
   usage: "lock",
   category: "admin",
   botPermission: ['MANAGE_SERVER', 'MANAGE_CHANNELS'],
   authorPermission: ['MANAGE_SERVER', 'MANAGE_CHANNELS'],
   run: async(client, message, args) => {
   message.channel.overwritePermissions([
     {
        id: message.guild.id,
        deny : ['SEND_MESSAGES'],
     },
    ],);
   const embed = new Discord.MessageEmbed()
   .setTitle("Cập nhật thay đổi kênh")
   .setDescription(`🔒 ${message.channel} đã bị khóa`)
   .setColor("RANDOM");
   await message.channel.send(embed);
   message.delete();
}
}
