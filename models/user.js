const Sequelize = require('sequelize');
const sequelize = require('../config/database');

module.exports = (sequelize, DataTypes) => {
const user = sequelize.define('user', {
  name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  },
});
return user;
};