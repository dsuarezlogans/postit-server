'use strict';

const config = require('../config');

const Post = require('../models/posts');
const Comment = require('../models/comments');

module.exports.getPosts = (req, res, next) => {
  Post.all({
      include: [ Comment ]
    })
    .then(data => {
      if (data.length <= 0) return res.status(200).jsonp({
        success: false,
        message: 'no hay post para mostrar'
      });

      return res.status(200).jsonp(data);
    })
    .catch(next);

};

module.exports.createPost = (req, res, next) => {

  Post.create({
      title: req.body.title,
      body: req.body.body,
      image: req.body.image
    })
    .then((data) => {
      return res.status(201).jsonp({
        success: true,
        message: 'Post creado con exito',
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
