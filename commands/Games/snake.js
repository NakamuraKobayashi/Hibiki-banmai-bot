const SnakeGame = require('snakecord')
module.exports = {
    name: 'snek',
    aliases: ["snake","rắn"],
    category: 'fun',
    description: 'chơi gem con zắn :3!',
    usage: 'snek',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const snakeGame = new SnakeGame({
            title: 'Snake Game',
            color: "BLUE",
            timestamp: true,
            gameOverTitle: client.emoji("DGH_game") +"<a:GameOver:848086959293202462> Game Over"
        });
        return snakeGame.newGame(message);
    }
}