const db = require("quick.db");

module.exports = {
 name: "say",
 category: "misc",
 usage: "say <nội dung>",
 args: true,
 run: async (client, message, args) => {
    message.delete();
    const usa = args.join(" ");
    if (!usa) return message.channel.send(`${message.author}, say <nội dung>`);
    let say = args.join(" ");
    message.channel.send(say);
  }
};
