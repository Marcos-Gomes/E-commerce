const jwt = require('jsonwebtoken');

const errorMessage = "Para acessar este recurso, um token de autenticação válido deve ser enviado.";

const tokenValidate = async (req, res, next) => {
    const { authorization } = req.headers;

    try {
        if(!authorization) {
            return res.status(401).json({ message: errorMessage});
        }

        const token = authorization.split(' ')[1];
        
        const user = jwt.verify(token, process.env.JWT_PASS);

        req.user = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        next();
    } catch (error) {
        return res.status(500).json({ message: "Para acessar este conteúdo é necessário fazer o login"});
    }
}

module.exports = tokenValidate;