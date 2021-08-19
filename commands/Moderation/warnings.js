const db = require("quick.db");

module.exports = {
  name: "warnings",
  description: "Xem số lần cảnh cáo của người được đề cập đến",
  category: "moderation",
  usage: "warnings <@user>",
  botPermission: ["ADMINISTRATOR"],
  authorPermission: ["ADMINISTRATOR"],
  arga: true,
  run: async(client, message, args) => {
    const user = message.mentions.members.first() || message.author;

    let warnings = await client.data.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) warnings = 0;

    client.send(`${user} bị cảnh cáo **${warnings}** lần`, message);
  }
};
