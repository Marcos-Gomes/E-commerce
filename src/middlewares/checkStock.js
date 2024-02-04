const knex = require('../databaseConnection');

const checkStock = async (req, res, next) => {
    try {
        try {
            const { pedido_produtos } = req.body;
            
            const errors = []

            for(let item of pedido_produtos){
                const [{ quantidade_estoque }] = await knex('produtos').where('id', item.produto_id).select('quantidade_estoque');

                if(item.quantidade_produto > quantidade_estoque){
                    errors.push({ message: `A quantidade solicitada do item com id ${item.produto_id} execede a quantidade em estoque`});
                }
            }

            if (errors.length > 0){
                return res.status(403).json(errors);
            }
        } catch (error) {
            return res.status(500).json({ message: "Favor verificar os dados informados" });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: "Favor verificar os dados informados"});
    }
};

module.exports = checkStock;