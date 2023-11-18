const knex = require('../databaseConnection');

const produtctVerify = async (req, res, next)=>{
    const { descricao } = req.body;

    const verificarDescricao = await knex('produtos').where('descricao', descricao).first();

    if(verificarDescricao){
        return res.status(401).json({ message: "Já existe uma descrição com esse nome. Por favor, escolha outro nome para evitar duplicidade."})
    }

    next();
};

module.exports = produtctVerify;