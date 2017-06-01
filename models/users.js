'use strict';

const config = require('../config');
const bcrypt = require('bcrypt-nodejs');

const User = config.DB_CONN.define('user', {
  username: {
    type: config.SEQUELIZE.STRING,
    unique: {
      arg: true,
      msg: 'Nombre de usuario existente'
    },
    allowNull: false,
    notNull: true,
    notEmpty: true,
    isLowercase: true

  },
  email: {
    type: config.SEQUELIZE.STRING,
    unique: {
      arg: true,
      msg: 'Email ya registrado'
    },
    allowNull: false,
    validate: {
      isEmail: {
        args: true,
        msg: 'Debe ingresar un correo valido'
      },
      notEmpty: true,
      isLowercase: {
        args: true,
        msg: 'correo debe ser minusculas'
      }
    }
  },
  firstName: {
    type: config.SEQUELIZE.STRING,
    allowNull: false,
    notEmpty: true

  },
  lastName: {
    type: config.SEQUELIZE.STRING,
    allowNull: false,
    notEmpty: true

  },
  password: {
    type: config.SEQUELIZE.STRING,
    allowNull: false,
    notEmpty: true

  }
});

User.beforeCreate((user, options) => {
  return hashPassword(user.password)
    .then(hashedPw => {
      user.password = hashedPw;
    })
    .catch(err => console.log(err));
});

let hashPassword = (password) => {

  let hashPromise = new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) reject(err);

      bcrypt.hash(password, salt, null, (err, hash) => {
        if (err) reject(err);

        password = hash;
        resolve(password);
      });
    });
  });
  return hashPromise;
};

module.exports = User;
