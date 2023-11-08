const express = require('express');
const { createUser, login, updateUser } = require('./controller/userController');
const { userValidate, emailExists } = require('./middlewares/userValidate');
const tokenValidate = require('./features/tokenValidate');
const { readCategory, createCategory, updateCategory, deleteCategory } = require('./controller/categoryController');
const { readProduct, createProduct, updateProduct, deleteProduct } = require('./controller/productController');
const categoyValidate = require('./middlewares/categoryValidate');
const categoryExists = require('./middlewares/categoryExists');

const routes = express.Router();

routes.post('/cadastrar', userValidate, emailExists, createUser);
routes.post('/login', login);

routes.use(tokenValidate);

routes.put('/user', emailExists, updateUser);

routes.get('/categorias', readCategory);
routes.post('/categorias', categoyValidate, categoryExists, createCategory);
routes.put('/categorias/:id', categoyValidate,  categoryExists, updateCategory);
routes.delete('/categorias/:id', deleteCategory);

routes.post('/produtos', createProduct);

module.exports = routes;