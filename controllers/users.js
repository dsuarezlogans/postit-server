'use strict';

const User = require('../models/users');
const bcrypt = require('bcrypt-nodejs');
const service = require('../services');

/*exports.getByID = (req, res, next, id) => {
  User.findById(id, {
      include: [{
        model: Location,
        include: [Country]
      }]
    })
    .then(user => {
      if (!user) res.sendStatus(404);
      req.user = user;
      next();
    })
    .catch(next);
};

exports.getUserByID = (req, res, next) => {
  res.status(200).jsonp(req.user);
};*/

exports.getUsers = (req, res, next) => {
  User.all()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(next);
};

exports.signUp = (req, res, next) => {

  const username = req.body.username;
  const email = req.body.email;

  User.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      firtsName: req.body.firtsName,
      lastName: req.body.lastName,
      password: req.body.password
    })
    .then(user => {
      return res.status(201).jsonp({
        success: true,
        message: 'registro exitoso',
        fullName: `${user.firtsName} ${user.lastName}`
      });
    })
    .catch(err => {
      return res.status(401).jsonp({
        success: false,
        message: err.errors[0].message
      });
    });

};

exports.signIn = (req, res, next) => {
  const user = User.find({
    where: {
      username: req.body.username
    }
  });

  user.then(data => {
    if (!data) return res.status(400).jsonp({
      success: false,
      message: 'usuario invalido'
    });

    bcrypt.compare(req.body.password, data.password, function(err, resp) {
      if (!resp) return res.status(400).jsonp({
        success: resp,
        message: 'contraseña invalida'
      });

      const token = service.createToken(data);

      return res.status(202).jsonp({
        success: resp,
        message: 'sesion iniciada',
        fullName: `${data.firtsName} ${data.lastName}`,
        token: token
      });
    });
  }).catch(next);
};
