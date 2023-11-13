const knex = require('../databaseConnection');
const dataVerify = require('../features/functions');

const categoryExists = async (req, res, next) => {
    const { descricao } = req.body;
    try {
        const category = await dataVerify('categorias', 'descricao', descricao);

        if(category){
            return res.status(400).json({ message: "Esta categoria já existe. Favor adicionar outra categoria"});
        }

        next();
    } catch (error) {       
        console.log(error.message);
        return res.status(500).json({ message: "Falha ao tentar requisitar"});
    }
}

module.exports = categoryExists