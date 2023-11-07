const categorySchema = require('../filters/categorySchema');

const categoyValidate = async (req, res, next) => {
    try {
        await categorySchema.validate(req.body);

        next();
    } catch (error) {
        return res.status(400).json({ message: error.errors });
    }

}

module.exports = categoyValidate;