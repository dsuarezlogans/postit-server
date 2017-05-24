'use strict';

const config = require('../config');

const Country = config.DB_CONN.define('country', {
  name: config.SEQUELIZE.STRING
}, {
  timestamps: false
});

module.exports = Country;
