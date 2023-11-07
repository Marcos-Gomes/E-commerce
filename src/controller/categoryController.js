const knex = require('../databaseConnection');
const dataVerify = require('../features/functions');

const categoryController = {
    async create (req, res) {
        const { description } = req.body;

        try {
            const newCategory = {
                description,
            }

            await knex('categories').insert(newCategory);

            return res.status(201).json({ message: `A categoria ${description} foi criada com sucesso` });
        } catch (error) {            
            return res.status(500).json({ message: "Falha ao adicionar a categoria. Verifique os dados informados e tente novamente"});
        }
    },

    async read (req, res) {
        try {
            const categoryList = await knex('categories');

            return res.status(200).json({ categoryList });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Falha ao tentar solicitar a requisição"});
        }
    },

    async update (req, res) {
        const { id } = req.params;
        const { description } = req.body;

        try {
            const showCategory = await dataVerify('categories', 'id', id);

            if(!showCategory){
                return res.status(404).json({ message: "Categoria não encontrada"});
            }

            const categoryUpdate = {
                description
            }

            await knex('categories').where({ id }).update(categoryUpdate);

            return res.status(201).json({ message: "Categoria editada com sucesso!"});
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Falha ao editar a categoria. Verifique os dados informados e tente novamente"});
        }
    
    },

    async deleteCategory (req, res) {
        const { id } = req.params;

        try {
            const showCategory = await dataVerify('categories', 'id', id);

            if(!showCategory){
                return res.status(404).json({ message: "Categoria não encontrada"});
            }

            await knex('categories').where({ id }).delete();

            return res.status(201).json({ message: "Categoria deletada com sucesso!"});

        } catch (error) {
            return res.status(500).json({ message: "Erro ao tentar deletar a categoria"});
        }
    }
}

module.exports = categoryController;