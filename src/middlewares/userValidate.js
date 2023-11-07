const userSchema = require('../filters/userSchema');
const dataVerify = require('../features/functions');

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

            const emailExists = await dataVerify('users', 'email', email);

             if(emailExists){
                return res.status(403).json({ message: 'O e-mail cadastrado já existe.'});
            }

            next();
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({message: 'Falha ao processar a requisição, tente novamente mais tarde'});
        }
    }
};

module.exports = requestsValidate;