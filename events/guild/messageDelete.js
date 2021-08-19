module.exports = async client => {
  client.snipe = new Map();
  client.on("messageDelete", function(message, channel) {
    client.snipe.set(message.channel.id, {
      content: message.content,
      author: "không thể lấy tên người dùng",
      name: message.attachments.first() ? message.attachments.array()[0].name: null,
      image: message.attachments.first()
        ? message.attachments.first().proxyURL
        : null
    });
  });
};
