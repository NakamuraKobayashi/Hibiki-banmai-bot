
const http = require("http");
const express = require("express");
const app = express();
var server = http.createServer(app);
app.get("/", (request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Bot đã hoạt động");
});

const listener = server.listen(process.env.PORT, function() {
  console.log(`Bot của bạn đang lắng nghe ở cổng ` + listener.address().port);
});
