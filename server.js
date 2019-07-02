"use strict";

require("dotenv").config();

const Hapi = require("@hapi/hapi");

const server = Hapi.server({
  port: 3001,
  host: "localhost"
});

exports.init = async () => {
  const sequelize = require("./db/connect");
  await sequelize.sync({ force: true });
  await server.initialize();
  return server;
};

exports.start = async () => {
  const sequelize = require("./db/connect");
  await sequelize.sync();
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    });
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
