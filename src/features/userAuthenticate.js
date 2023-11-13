const knex = require('../databaseConnection');
const bcrypt = require('bcrypt');

const userAuthenticate = async (email, senha) => {
    try {
        const user = await knex('usuarios').where({email}).first();

        if(user && await bcrypt.compare(senha, user.senha)){
            return user;
        }
        throw { message: 'Credenciais inválidas'}
    } catch (error) {
        throw new Error('Erro ao autenticar usuário: ' + error.message);
    }
};

module.exports = userAuthenticate;
