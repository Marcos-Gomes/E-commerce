const knex = require('../databaseConnection');

const verifyCategoryExists = async (categorias_id)=> {
    const categoryExists = await knex('categorias').where('id', categorias_id).first();

    if (!categoryExists) {
        throw new Error('Favor selecionar uma categoria existente');
    }
}

module.exports = verifyCategoryExists;