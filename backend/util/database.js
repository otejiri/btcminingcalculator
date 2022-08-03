const { Sequelize } = require("sequelize");

const connection = new Sequelize(
  "dej5g5c9djnmco",
  "sbusjsmxvqihqc",
  "555a394bbf093fde56d6637100ae37915f9bcc32d9a1f89eeae159e7086ae0d7",
  {
    host: "ec2-3-213-228-206.compute-1.amazonaws.com",
    port: "5432",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }
);

module.exports = connection;
