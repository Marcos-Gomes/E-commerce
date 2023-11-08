const knex = require('../databaseConnection');

const productController = {
    async createProduct (req, res) {
        const { description, stock_quantity, product_value, categories_id } = req.body;

        return res.send(description);
    }
}

module.exports = productController;