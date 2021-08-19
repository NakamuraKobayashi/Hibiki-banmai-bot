const axios = require('axios')
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "instagram",
    description: "Tìm một người dùng mà bạn tìm kiếm",
    aliases: ["ig", "insta"],
    category: "search",
    run: async (client, message, args) => {
        if (!args[0]) {
            return message.channel.send(`Hãy điền Tên một người dùng`)
        }
        let url, response, account, details;
        try {
            url = `https://instagram.com/${args[0]}/?__a=1`;
            response = await axios.get(url)
            account = response.data
            details = account.graphql.user
        } catch (error) {
            return message.channel.send(`Không thể tìm thấy người dùng đó, hoặc có thể là một người dùng riêng tư? Hoặc cái gì đó khác?`)
        }

        const embed = new MessageEmbed()
            .setTitle(`${details.is_verified ? `${details.username} <a:tick_xanh:842289632431177729>` : ` ${details.username}`} ${details.is_private ? '🔒' : ''} `)
            .setDescription(details.biography)
            .setThumbnail(details.profile_pic_url)
            .addFields(
                {
                    name: "Tổng số bài đăng:",
                    value: details.edge_owner_to_timeline_media.count.toLocaleString(),
                    inline: true
                },
                {
                    name: "Người theo dõi:",
                    value: details.edge_followed_by.count.toLocaleString(),
                    inline: true
                },
                {
                    name: "Đang theo dõi:",
                    value: details.edge_follow.count.toLocaleString(),
                    inline: true
                }
            )
        await message.channel.send(embed)

    }
}