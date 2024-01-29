const customerSchema = require('../filters/customerSchema');
const cpfValidation = require('node-cpf');

const customerValidate = async (req, res, next) => {
    try {
        await customerSchema.validate(req.body);

        next();
    } catch (error) {
        return res.status(400).json({message: error.errors});
    }
}

const cpfValidate = async (req, res, next) => {
    const { cpf } = req.body;

    const cpfIsValid = cpfValidation.validate(cpf);
        
    if(cpfIsValid == false){
        return res.status(403).json({ message: "Favor utilizar um CPF válido"});
    }

    next();
}

module.exports = {
    customerValidate,
    cpfValidate,    
}