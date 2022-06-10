require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_TABLE, process.env.DB_USER, process.env.DB_PASS, {
    dialect: process.env.DB_DIALECT,
    logging: false,
    host: `${process.env.DB_HOST}`,
    port: `${process.env.DB_PORT}`,
    define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true,
        id: false,
        createdAt: false,
        updatedAt: false,
    },
});

module.exports = sequelize;
