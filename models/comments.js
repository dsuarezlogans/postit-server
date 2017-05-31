'use strict';

const config = require('../config');

const Comment = config.DB_CONN.define('comment', {
  message: {
    type: config.SEQUELIZE.TEXT,
    defaultValue: '',
    allowNull: false,
    validate: {
      notEmpty: {
        arg: true,
        msg: 'Debe ingresar un comentario'
      }
    }
  },
  user: {
    type: config.SEQUELIZE.STRING,
    defaultValue: '',
    allowNull: false,
    validate: {
      notEmpty: {
        arg: true,
        msg: 'Debe ingresar un nombre de usuario'
      }
    }
  },

});

module.exports = Comment;
