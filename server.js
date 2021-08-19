const Discord = require("discord.js");
const fs = require("fs");
const { Client } = require("discord.js");
const db = require("quick.db");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const Discord4Bots = require("discord4bots");
const { Database } = require("quickmongo");
let dd = require('discord-buttons-plugins');
const YoutubePoster = require("discord-yt-poster");
let ddl = require('discord-buttons');

const { Owner, Developer, Support, Dashboard, Server_ID } = require("./config.js");
let { Token, mongodb } = require("./config.js")
for (const token of Token) {
  const client = new Client({
    disableEveryone: "everyone",
    partials: ["REACTION", "MESSAGE", "CHANNEL"]
  });
let {
    awaitReply,
    resolveUser,
    getRandomString,
    send,
    emo,
    text,
    randomNumber,
    formating, Emoji,
    translate
  } = require("./Functions.js"); 

  const dbl = new Discord4Bots("yhiJwowjQneauWvPaZnDfGHY", client);
  client.commands = new Discord.Collection();
  client.aliases = new Discord.Collection();
  client.slashcommands = new Discord.Collection();
  client.data = new Database(mongodb);
  client.queue = new Map();
  client.vote = new Map();

  client.config = require("./emoji/emojis");
  client.discord = require("discord.js");
  client.db = require("quick.db");
  client.button = new dd(client)
  client.request = new (require("rss-parser"))();
  require("./index.js");

  require("./handlers/reply.js"); 
  require ("./handlers/commands.js")(client)
  client.YTP = new YoutubePoster(client);
  
  let emoji = async function(m, n) {
    if(n === "id"){
    let emojis = client.emojis.cache.find(x => x.name === m);
    return emojis.id
    }
    if(n === "name"){
    let emojis = client.emojis.cache.find(x => x.name === m);
    return emojis.name
    }
    let emojis = client.emojis.cache.find(x => x.name === m);
    if (!emojis) return m;
    if (emojis) {
      let temp = emojis.toString();
      return m.split(new RegExp(m, "g")).join(emojis.toString()).split(" ").join("_");
    }
  };
  
  client.data2 = client.data;
  client.emotes = client.config.emojis;
  client.resolveUser = resolveUser;
  client.awaitReply = awaitReply;
  client.random = getRandomString;
  client.send = send;
  client.count = emo;
  client.emoji = emoji;
  client.EEmoji = Emoji;
  client.text = text;
  client.format = formating;
  client.translate = translate;
  global.client = client;

  client
    .login(token)
    .catch(() =>
      console.log(`❌ Token Không Hợp Lệ, hãy cung cấp một Token hợp lệ!`)
    );
}
