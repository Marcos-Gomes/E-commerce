const { userSchema } = require('../filters/userSchema');
const dataVerify = require('../features/dataVerify');

const requestsValidate = {
    async userValidate (req, res, next){
        try {
            await userSchema.validate(req.body);

            next();
        } catch (error) {            
            return res.status(400).json({message: error.errors});
        }
    },

    async updateValidate (req, res, next){
        try {
            await updateSchema.validate(req.body);
        } catch (error) {
            return res.status(400).json({message: error.errors});
        }
    },

    async emailExists (req, res, next){
        try {
            const { email } = req.body;

            const userEmailExists = await dataVerify('usuarios', 'email', email);

            const customerEmailExists = await dataVerify('clientes', 'email', email);
            
            if (customerEmailExists) {
                return res.status(403).json({ message: 'O e-mail cadastrado já existe.'});
            }

            if(userEmailExists){
                return res.status(403).json({ message: 'O e-mail cadastrado já existe.'});
            } 

            next();
        } catch (error) {            
            return res.status(500).json({message: 'Falha ao processar a requisição, tente novamente mais tarde'});
        }
    }
};

module.exports = requestsValidate;