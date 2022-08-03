const Sequelize = require("sequelize");

const connection = require("../util/database");

const DeviceList = connection.define("DeviceList", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  release: Sequelize.STRING,
  hash: Sequelize.BIGINT,
  power: Sequelize.INTEGER,
  noise: Sequelize.INTEGER,
  cost: Sequelize.DOUBLE,
  link: Sequelize.STRING,
});

module.exports = DeviceList;
