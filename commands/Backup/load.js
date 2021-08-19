const backup = require("discord-backup");
const owner = ["740947753135243354", "767726828311543820"];
backup.setStorageFolder(__dirname+"/Storages/")

module.exports = {
  name: "load-backup",
  usage: "<backup id của bạn>",
  description: "Load một backup, sẽ có một vài cái sẽ không dc backup",
  category: "backup",
/*  botPermission: ["ADMINISTRATOR"],
  authorPermission: ["ADMINISTRATOR"],*/
  run: async (client, message, args) => {
    if (owner.includes(message.author.id) === false) {
      return;
    }

    let backupID = args[0];
    if (!backupID) {
      return client.send(":x: | Bạn cần chỉ định một ID backup hợp lệ!", message);
    }
    // Fetching the backup to know if it exists
    backup
      .fetch(backupID)
      .then(async () => {
        // If the backup exists, request for confirmation
        client.send(
          ":warning: | Khi mà bản backup được load, tất cả kênh, role,.... sẽ được thay thế! gõ `ok` để xác nhận!",
          message
        );
        await message.channel
          .awaitMessages(
            m => m.author.id === message.author.id && m.content === "ok",
            {
              max: 1,
              time: 20000,
              errors: ["time"]
            }
          )
          .catch(err => {
            // if the author of the commands does not confirm the backup loading
            return client.send(
              ":x: | Đã hết thời gian chờ, hủy lệnh load backup!",
              message
            );
          });
        // When the author of the command has confirmed that he wants to load the backup on his server
        client.send(
          ":white_check_mark: | Bắt đầu chạy file backup!",
          message,
          "dm"
        );
        // Load the backup
        backup
          .load(backupID, message.guild)
          .then(() => {
            // When the backup is loaded, delete them from the server
          })
          .catch(err => {
            // If an error occurred
            return client.send(
              ":x: | Xin lỗi, đã có lỗi được phát hiện... hãy chắc chắn rằng tôi có quyền ADMINISTRATOR để có thể hoạt động lệnh này!",
              message
            );
          });
      })
      .catch(err => {
        console.log(err);
        // if the backup wasn't found
        return client.send(
          ":x: | Không tìm thấy backup ID `" + backupID + "`!",
          message
        );
      });
  }
};
