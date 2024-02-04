const knex = require('../databaseConnection');

const purchaseController = {
    async registerPurchase(req, res){
        
        try {
            const { observacao, pedido_produtos } = req.body;
            
            const orderPromises = pedido_produtos.map(async (item) => {
                const [{ valor_produto }] = await knex('produtos').where('id', item.produto_id).select('valor_produto');

                const valorTotal = valor_produto * item.quantidade_produto;

                await knex('pedidos').insert({
                    cliente_id: req.user.id,
                    observacao,
                    valor_total: valorTotal
                });
            });

            await Promise.all(orderPromises);

            const orderProductPromises = pedido_produtos.map(async(item) => {
                const [{ id }] = await knex('pedidos').select('id');
                const [{ valor_produto }] = await knex('produtos').where('id', item.produto_id).select('valor_produto');               

                await knex('pedido_produtos').insert({
                    pedido_id: id,
                    produto_id: item.produto_id,
                    quantidade_produto: item.quantidade_produto,
                    valor_produto: valor_produto
                });
            });

            await Promise.all(orderProductPromises);
            
            return res.status(201).json({ message: "Compra realizada com sucesso"});
        } catch (error) {            
            return res.status(500).json({ message: "Falha ao registrar a compra, verifique os dados e tente novamente"});
        }        
    }
}

module.exports = purchaseController;