module.exports = {
  name: "delcmd",
  usage: "delcmd <tên_command>",
  description: "Xóa commands tùy chỉnh",
  category: "admin",
  args: true,
   authorPermission: ["MANAGE_MESSAGES"],
  botPermission: ["MANAGE_MESSAGES"],
 run: async (client, message, args) => {
   let cmdname = args[0];
   let database = await client.data.get(`cmd_${message.guild.id}`);
    if (database) {
      let data = database.find(x => x.name === cmdname.toLowerCase());

      if (!data)
        return client.send(await client.emoji("DGH_error") +" Không thể tìm thấy lệnh n.", message);

      let value = database.indexOf(data);
      delete database[value];

      var filter = database.filter(x => {
        return x != null && x != "";
      });

      client.data.set(`cmd_${message.guild.id}`, filter);
      return client.send(await client.emoji("DGH_error") +`Đã xóa lệnh **${cmdname}** !`, message);
    } else {
      return client.send(
       await client.emoji("DGH_error") + "Xin lỗi nhưng tôi không thể tìm thấy lệnh đó!", message
      );
    }
  }
};
