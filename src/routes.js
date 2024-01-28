const express = require('express');
const { createUser, login, updateUser } = require('./controller/userController');
const { userValidate, emailExists } = require('./middlewares/userValidate');
const tokenValidate = require('./features/tokenValidate');
const { readCategory, createCategory, updateCategory, deleteCategory } = require('./controller/categoryController');
const { readProduct, createProduct, updateProduct, deleteProduct, showProdutcs, listarImagens } = require('./controller/productController');
const categoyValidate = require('./middlewares/categoryValidate');
const categoryExists = require('./middlewares/categoryExists');
const multer = require('./middlewares/multer');
const productValidate = require('./middlewares/productValidate');
const {produtctVerify, productExists} = require('./middlewares/productVerify');

const routes = express.Router();

routes.post('/cadastrar', userValidate, emailExists, createUser);
routes.post('/login', login);

routes.use(tokenValidate);

routes.put('/user', emailExists, updateUser);

routes.get('/categorias', readCategory);
routes.post('/categorias', categoyValidate, categoryExists, createCategory);
routes.put('/categorias/:id', categoyValidate,  categoryExists, updateCategory);
routes.delete('/categorias/:id', deleteCategory);

routes.get('/produtos', showProdutcs);
routes.post('/produtos', multer.single('produto_imagem'), produtctVerify, createProduct);
routes.put('/produtos/:id', multer.single('produto_imagem'), produtctVerify, productExists, updateProduct);
routes.delete('/produtos/:id', productExists, deleteProduct);

module.exports = routes;