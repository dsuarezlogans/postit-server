'use strict';

const User = require('../models/users');
const Location = require('../models/locations');
const Country = require('../models/country');

exports.getByID = (req, res, next, id) => {
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
};

exports.getUsers = (req, res, next) => {
  User.all({
      include: [{
        model: Location,
        include: [Country]
      }]
    })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(next);
};

exports.setUser = (req, res, next) => {
  User.create({
      username: req.body.username,
      birthday: req.body.birthday,
      location: {
        address: req.body.address,
        zipcode: req.body.zipcode,
        country: {
          name: req.body.country
        }
      }
    }, {
      include: [{
        model: Location,
        include: [Country]
      }]
    })
    .then(user => res.status(200).jsonp(user))
    .catch(next);
};

exports.setLocation = (req, res, next) => {
  req.user.setLocation(req.body.locationId)
    .then(user => {
      res.status(200).jsonp(user);
    })
    .catch(next);
};

exports.queryUsers = () => {
  const obj = {};
  let dataPromise = new Promise((resolve, reject) => {
    User.all({
        include: [{
          model: Location,
          include: [Country]
        }]
      })
      .then(users => {
        console.log(users);
        if(users.length <= 0) reject(obj.message = 'no users registered');
        resolve(users);
      })
      .catch(err => reject(err));
  });

    return dataPromise;
};
