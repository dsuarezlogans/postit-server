'use strict';

const config = require('../config');

const Country = require('./country');

const Location = config.DB_CONN.define('location', {
  address: config.SEQUELIZE.STRING,
  zipcode: config.SEQUELIZE.INTEGER
}, {
  timestamps: false
});

Location.belongsTo(Country);

module.exports = Location;
