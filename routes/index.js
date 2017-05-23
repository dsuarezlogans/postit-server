const api = require('express').Router();

const ctrlUser = require('../controllers/users');

api.param('id',ctrlUser.getByID);

api.get('/users',ctrlUser.getUsers)
   .get('/users/:id', ctrlUser.getUserByID)
   .post('/users', ctrlUser.setUser)
   .put('/users/:id/location', ctrlUser.setLocation);

module.exports = api;
