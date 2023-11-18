const knex = require('../databaseConnection');

const dataVerify = async (table, column, data) => {
    const verify = await knex(table).where(column, data).first();
    return verify;
}

module.exports = dataVerify;
