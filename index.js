const express = require("express");

let http = require("http");
let server = http.createServer(function (req, res) {
  res.write('<h1 style="color: green">Hello Campers</h1>');
  res.end();
});

server.listen(3000, function () {
  console.log("Camping at site 3000⛺");
});
