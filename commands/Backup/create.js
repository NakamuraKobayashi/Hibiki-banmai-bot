const backup = require("discord-backup");
backup.setStorageFolder(__dirname+"/Storages/")
const { Default_Prefix, Color } = require("../../config.js");
const owner = ["740947753135243354", "767726828311543820"];

module.exports = {
  name: "create-backup",
  usage: "",
  description: "Tạo file backup cho server",
  category: "backup",
 /* botPermission: ["ADMINISTRATOR"],
  authorPermission: ["ADMINISTRATOR"],
*/
  run: async (client, message, args) => {
    if (owner.includes(message.author.id) === false) {
      return;
    }
backup.create(message.guild, {
jsonBeautify: true
}).then((backupData) => {
 // And send informations to the backup owner
  client.send("Server: "+ message.guild.name+ "\nBản sao lưu đã được tạo! Để load file backup, gõ lệnh này ở server bạn muốn load backup: `" + Default_Prefix + "load-backup " + backupData.id + "`!", message,"dm");
  client.send("Bản sao lưu đã được tạo! Để load file backup, gõ lệnh này ở server bạn muốn load backup: `" + Default_Prefix + "load-backup " + backupData.id + "`!", message,"dms");
 // client.send(":white_check_mark: Backup successfully created. Back up id sended in your DMs!", message);
});
  }
}