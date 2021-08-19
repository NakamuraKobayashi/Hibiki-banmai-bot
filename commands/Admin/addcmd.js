module.exports = {
  name: "addcmd",
  usage: "addcmd <tên_commands> <commands_phản_hồi>",
  description: "thêm lệnh tùy chỉnh cho server",
  category: "admin",
  args: true,
  authorPermission: ["MANAGE_MESSAGES"],
  botPermission: ["MANAGE_MESSAGES"],
  run: async (client, message, args) => {
    let cmdname = args[0];
    let cmdresponce = args.slice(1).join(" ");
    if (!cmdresponce)
      return client.send(
        `${await client.emoji("DGH_error")} Bạn phải cung cấp commands phản hồi, \`addcmd <tên_commands> <commands_phản_hồi>\``
      , message);
    let database = await client.data.get(`cmd_${message.guild.id}`);
    if (database && database.find(x => x.name === cmdname.toLowerCase()))
      return client.send(
        `${await client.emoji("DGH_error")} Tên lệnh này đã có trong lệnh tùy chỉnh của Server.`
      , message);
    let data = {
      name: cmdname.toLowerCase(),
      responce: cmdresponce
    };
    client.data.push(`cmd_${message.guild.id}`, data);
    return client.send(
     await client.emoji("DGH_success") + " Đã thêm lệnh **" + cmdname.toLowerCase() + "** là một lệnh tùy chỉnh của Server."
    , message);
  }
};
