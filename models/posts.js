'use strict';

const config = require('../config');
const Comment = require('./comments');

const Post = config.DB_CONN.define('post', {
  title: {
    type: config.SEQUELIZE.STRING,
    unique: {
      arg: true,
      msg: 'Ya se ha creado contenido con ese titulo'
    },
    defaultValue: '',
    allowNull: false,
    validate: {
      notEmpty: {
        arg: true,
        msg: 'Debe ingresar un titulo'
      }
    }
  },
  body: config.SEQUELIZE.TEXT,
  image: {
    type: config.SEQUELIZE.STRING,
    defaultValue: '/public/img/default.png'
  },
  author: {
    type: config.SEQUELIZE.STRING,
    defaultValue: '',
    allowNull: false,
    validate: {
      notEmpty: {
        arg: true,
        msg: 'Debe ingresar un nombre de autor'
      }
    }
  },
});

Post.hasMany(Comment, {
  foreignKey: {
    allowNull: false,
    defaultValue: '',
    validate: {
      notEmpty: {
        arg: true,
        msg: 'Debe agregar el comentario a un post'
      }
    }
  },
  onDelete: 'CASCADE'
});

module.exports = Post;
