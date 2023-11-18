const productSchema = require('../filters/productSchema');

const productValidate = async (req, res, next) => {
    try {
        await productSchema.validate(req.body);

        next();
    } catch (error) {
        return res.status(400).json({ message: error.errors });
    }

}

module.exports = productValidate;