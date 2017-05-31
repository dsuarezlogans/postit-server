'use strict';

const api = require('express').Router();

const auth = require('../middlewares/auth');

const ctrlUser = require('../controllers/users');
const ctrlPost = require('../controllers/posts');
const ctrlComment = require('../controllers/comments');

//api.param('id',ctrlUser.getByID);

api.post('/signin', ctrlUser.signIn)
   .post('/signup', ctrlUser.signUp);

api.route('/posts')
   .get(auth, ctrlPost.getPosts)
   .post(auth, ctrlPost.createPost);

api.route('/comments')
    .get(auth, ctrlComment.getComments)
    .post(auth, ctrlComment.createComment);

module.exports = api;
