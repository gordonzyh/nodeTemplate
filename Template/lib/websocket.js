/**
 * Created by Administrator on 2015/7/31.
 */
//redis
var basePath = process.cwd();
basePath = basePath.indexOf("bin") != -1 ? basePath.substr(0, basePath.indexOf("bin") - 1) : basePath;
var fs = require("fs");
const config = require(basePath + "/config/config").config;
var port = "8080";//默认为8080
var http = require("http");
var io = require("socket.io");
var hanzi = require("hanzi");
hanzi.start();
var socketRoutes = require(basePath + "/routes/sckRoutes.js");

if (config.socket != null) {
    port = config.socket.PORT;
}
var server = http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("WebSocket Start~~~~~~~~~~~~");
    response.end("");
}).listen(port);

var socket = io.listen(server);


//服务器监控socket
socket.on("connection", function (cli) {
    socketRoutes.socketRoutes(cli)
});
