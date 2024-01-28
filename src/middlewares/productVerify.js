const dataVerify = require('../features/dataVerify');

const produtctVerify = async (req, res, next)=>{
    const { descricao } = req.body;
    
    const checkDescription = await dataVerify('produtos', 'descricao', descricao);

    if(checkDescription){
        return res.status(401).json({ message: "Já existe uma descrição com esse nome. Por favor, escolha outro nome para evitar duplicidade."})
    }

    next();
};

const productExists = async (req, res, next)=>{
    const { id } = req.params;

    const verifyProduct = await dataVerify('produtos', 'id', id);

    if(!verifyProduct){
        return res.status(404).json({ message: "Produto não encontrado"});
    }

    next();
}

module.exports = {
    produtctVerify, 
    productExists
};