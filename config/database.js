const { Sequelize } = require('sequelize');

const database = new Sequelize('clothes-store', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = database;

