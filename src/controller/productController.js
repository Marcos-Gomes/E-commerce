const { uploadFile } = require('../aws-skd');
const { deleteFile} = require('../backBlazeB2');
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
                user_id: req.user.id
            };
            
            await knex('produtos').insert(newProduct);            

            return res.status(201).json({ message: "Produto criado com sucesso!"});
        } catch (error) {
            return handleErrorResponse(res, error);
        }
    },

    async showProdutcs (req, res){
        try {
            const products = await knex('produtos').where('user_id', req.user.id);
            
            if(products.length === 0){
                return res.status(404).json({ message: "Nenhum produto foi encontrado" });
            }            

            const product = products.map(product => {                
                return {
                    ...product,
                    produto_imagem: decodeBase64(product.produto_imagem)
                }
            });            

            return res.status(200).json({ product });
        } catch (error) {
            return res.status(500).json({ message: "Falha ao tentar recuperar os produtos"});
        }
    },

    async updateProduct (req, res){        
        const { descricao, quantidade_estoque, valor_produto, categorias_id } = req.body;
        const { originalname, mimetype, buffer } = req.file;
        
        await verifyCategoryExists(categorias_id);

        let imageName = "";            

        if (originalname) {
            imageName = imageBase64(originalname);
            await uploadFile(originalname, mimetype, buffer);
        }

        const productUpdate = {
            descricao,
            quantidade_estoque,
            valor_produto,
            categorias_id,
            produto_imagem: imageName,
            user_id: req.user.id
        };
        
        await knex('produtos').update(productUpdate);

        return res.status(201).json({ message: "Produto Atualizado com sucesso!"});        
    },

    async deleteProduct(req, res){
        const { id } = req.params;

        let imageName = "";

        const produtcVerify = await knex('produtos').where('id', id);
        
        if(produtcVerify.length > 0){
            for(let item of produtcVerify){
                imageName = item.produto_imagem;
            }
    
            const linkImage = decodeBase64(imageName);

            deleteFile(linkImage);

            await knex('produtos').delete().where('id', id);
        }

        return res.status(200).json({message: "Produto excluido com sucesso"});
    },

    
}

module.exports = productController;