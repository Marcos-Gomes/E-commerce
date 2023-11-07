const express = require('express');
const { createUser, login, updateUser } = require('./controller/userController');
const { userValidate, emailExists } = require('./middlewares/userValidate');
const tokenValidate = require('./features/tokenValidate');
const { read, create, update, deleteCategory } = require('./controller/categoryController');
const categoyValidate = require('./middlewares/categoryValidate');
const categoryExists = require('./middlewares/categoryExists');

const routes = express.Router();

routes.post('/cadastrar', userValidate, emailExists, createUser);
routes.post('/login', login);

routes.use(tokenValidate);

routes.put('/user', emailExists, updateUser);


routes.get('/categorias', read);
routes.post('/categorias', categoyValidate, categoryExists, create);
routes.put('/categorias/:id', categoyValidate,  categoryExists, update);
routes.delete('/categorias/:id', deleteCategory);

module.exports = routes;