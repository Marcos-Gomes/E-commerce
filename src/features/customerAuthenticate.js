const knex = require('../databaseConnection');
const bcrypt = require('bcrypt');

const customerAuthenticate = async (email, senha) => {
    try {
        const user = await knex('clientes').where({email}).first();

        if(user && await bcrypt.compare(senha, user.senha)){
            return user;
        }
        throw { message: 'Credenciais inválidas'}
    } catch (error) {
        throw new Error('Erro ao autenticar usuário: ' + error.message);
    }
};

module.exports = customerAuthenticate;
