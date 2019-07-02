"use strict";

const Hapi = require("@hapi/hapi");

const server = Hapi.server({
  port: 3001,
  host: "localhost"
});

exports.init = async () => {
  await server.initialize();
  return server;
};

exports.start = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
  return server;
};

server.route({
  method: "GET",
  path: "/",
  handler: function() {
    return "Hello World!";
  }
});

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});
