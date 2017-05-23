const config = require('../config');
const Location = require('./locations');

const User = config.DB_CONN.define('user', {
  username: config.SEQUELIZE.STRING,
  birthday: config.SEQUELIZE.DATE
});

User.belongsTo(Location);

module.exports = User;
