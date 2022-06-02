//lib
const express = require("express");
const app = new express();
const server = require("http").createServer(app);
const io = require('socket.io')(server);


module.exports ={
    server,
    io,
    app,
    express
}