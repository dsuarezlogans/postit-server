'use strict';

const services = require('../services');

function isAuth (req, res, next) {
  console.log(req.headers);
  if (!req.headers.authorization) {
    return res.status(401).send({ success:false, message: 'No tienes autorización' });
  }

  const token = req.headers.authorization.split(' ')[1];

  services.decodeToken(token)
    .then(response => {
      req.user = response;
      next();
    })
    .catch(response => {
      return res.status(response.status).jsonp(response);
    });
}

module.exports = isAuth;
