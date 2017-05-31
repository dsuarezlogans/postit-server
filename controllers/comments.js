'use strict';

const Comment = require('../models/comments');
const config = require('../config');

module.exports.getComments = (req, res, next) => {

  Comment.all()
    .then(data => {
      if (data.length < 0) return res.status(200).jsonp({
        success: false,
        message: 'No hay comentarios para mostrar'
      });

      return res.status(200).jsonp(data);
    })
    .catch(next);

};

module.exports.createComment = (req, res, next) => {
  Comment.create({
      message: req.body.comment,
      user: req.body.user,
      postId: req.body.postId
    })
    .then((data) => {
      return res.status(201).jsonp({
        success: true,
        message: 'Comentario creado con exito',
        data: data
      });
    })
    .catch(err => {
      return res.status(401).jsonp({
        sucess: false,
        message: err.errors[0].message
      });
    });

};
