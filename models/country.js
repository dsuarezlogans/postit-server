const config = require('../config');

const Country = config.DB_CONN.define('country', {
  name: config.SEQUELIZE.STRING
});

module.exports = Country;
