const knex = require('../databaseConnection');
const dataVerify = require('../features/dataVerify');

const categoryController = {
    async createCategory (req, res) {
        const { descricao } = req.body;

        try {
            const newCategory = {
                descricao,
            }

            await knex('categorias').insert(newCategory);

            return res.status(201).json({ message: `A categoria ${descricao} foi criada com sucesso` });
        } catch (error) {            
            return res.status(500).json({ message: "Falha ao adicionar a categoria. Verifique os dados informados e tente novamente"});
        }
    },

    async readCategory (req, res) {
        try {
            const categoryList = await knex('categorias');        

            if(!categoryList || categoryList.length == 0){
                return res.status(404).json({ message: "Nenhuma categoria cadastrada"});
            }

            return res.status(200).json({ categoryList });
        } catch (error) {            
            return res.status(500).json({ message: "Falha ao tentar solicitar a requisição"});
        }
    },

    async updateCategory (req, res) {
        const { id } = req.params;
        const { descricao } = req.body;

        try {
            const showCategory = await dataVerify('categorias', 'id', id);

            if(!showCategory){
                return res.status(404).json({ message: "Categoria não encontrada"});
            }

            const categoryUpdate = {
                descricao
            }

            await knex('categorias').where({ id }).update(categoryUpdate);

            return res.status(201).json({ message: "Categoria editada com sucesso!"});
        } catch (error) {            
            return res.status(500).json({ message: "Falha ao editar a categoria. Verifique os dados informados e tente novamente"});
        }    
    },

    async deleteCategory (req, res) {
        const { id } = req.params;

        try {
            const showCategory = await dataVerify('categorias', 'id', id);

            if(!showCategory){
                return res.status(404).json({ message: "Categoria não encontrada"});
            }

            await knex('categorias').where({ id }).delete();

            return res.status(201).json({ message: "Categoria deletada com sucesso!"});

        } catch (error) {
            return res.status(500).json({ message: "Erro ao tentar deletar a categoria"});
        }
    }
}

module.exports = categoryController;