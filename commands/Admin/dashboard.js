module.exports = {
  name: "dashboard",
  description: "dashboard Hibiki Ban Mai Bot (Hiện chưa có dashboard)",
  aliases: ["db"],
  category: "admin",
  run: async (client, message, args) => {
    const web = new client.button.MessageButton()
      .setStyle("green")
      .setEmoji(client.emoji("DGH_info","id"))
      .setLabel("Hiện Tại Chưa Có Dashboard");
    client.button.send("Dashboard Của Tôi", {
      channel: message.channel.id,
      buttons: [[web]]
    });
  }
};
