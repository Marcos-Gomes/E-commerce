const knex = require('../databaseConnection');
const bcrypt = require('bcrypt');

const userAuthenticate = async (email, password) => {
    try {
        const user = await knex('users').where({email}).first();

        if(user && await bcrypt.compare(password, user.password)){
            return user;
        }
        throw { message: 'Credenciais inválidas'}
    } catch (error) {
        throw new Error('Erro ao autenticar usuário: ' + error.message);
    }
};

module.exports = userAuthenticate;
