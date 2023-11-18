const { uploadFile } = require('../aws-skd');
const knex = require('../databaseConnection');
const decodeBase64 = require('../features/decodeBase64');
const imageBase64 = require('../features/imageBase64');
const verifyCategoryExists = require('../features/verifyCategoryExists');


const productController = {
    async createProduct (req, res) {
        try {
            const { descricao, quantidade_estoque, valor_produto, categorias_id } = req.body;
            const { originalname, mimetype, buffer } = req.file;

            await verifyCategoryExists(categorias_id);

            let imageName = "";            

            if (originalname) {
                imageName = imageBase64(originalname);
                await uploadFile(originalname, mimetype, buffer);
            }

            const newProduct = {
                descricao,
                quantidade_estoque,
                valor_produto,
                categorias_id,
                produto_imagem: imageName,
            };
            
            await knex('produtos').insert(newProduct);            

            return res.status(201).json({ message: "Produto criado com sucesso!"});
        } catch (error) {
            return handleErrorResponse(res, error);
        }
    },

    async showProdutcs (req, res){
        try {
            const products = await knex('produtos');

            if(!products){
                return res.status(404).json({ message: "Nenhum produto foi encontrado" });
            }            

            const productWithDecodeImage = products.map(product => {                
                return {
                    ...product,
                    produto_imagem: decodeBase64(product.produto_imagem)
                }
            })

            return res.status(200).json({ productWithDecodeImage });
        } catch (error) {
            return res.status(500).json({ message: "Falha ao tentar recuperar os produtos"});
        }
    }
}

module.exports = productController;