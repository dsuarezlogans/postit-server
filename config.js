'use strict';

const Sequelize = require('sequelize');

const db = new Sequelize('test', 'dsuarez', 'Ds23589*144', {
  host: 'dsuarez-devserver.database.windows.net',
  logging: false,
  dialect: 'mssql',
  dialectOptions: {
    encrypt: true
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

module.exports = {
  PORT: process.env.PORT || '3000',
  DB_CONN: db,
  SEQUELIZE: Sequelize,
  SECRET_TOKEN: '5W9/h}0#H1oob%I2l}z1a<E!#B*S+'  
};
