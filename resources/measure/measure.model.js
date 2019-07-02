const Sequelize = require("sequelize");
const sequelize = require("../../db/connect");

const Measure = sequelize.define(
  "measure",
  {
    date: {
      type: Sequelize.STRING,
      allowNull: false
    },
    chest: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    hip: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    weight: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    // options
  }
);

module.exports = Measure;
