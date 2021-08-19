module.exports = {
  name: "nuke",
  category: "moderation",
  description: "Xóa tất cả tin nhắn ở trong một kênh chat.",
  usage: "nukeeeee",
  authorPermission: ["MANAGE_CHANNELS"],
  botPermission: ["MANAGE_CHANNELS"],
  run: async (client, message, args) => {
    let channel = client.channels.cache.get(message.channel.id);
    const position = channel.position;
    const topic = channel.topic;
    const channel2 = await channel.clone();
    channel2.setPosition(position);
    channel2.setTopic(topic);
    channel.delete();
    const nuke = new client.discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(":boom: **Kênh này đã bị NUKE! <:puddingsmile:863961510647562260>**");
    return channel2.send(nuke).then(m=>m.delete({timeout:10000}).catch(e=>{}));
  }
};
