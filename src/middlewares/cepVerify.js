const cepVerify = async (req, res, next) => {
    try {
        const { cep } = req.body;

        if(cep.length > 8 || cep.length < 8){
            return res.status(400).json({ message: "Verifique os números do CEP digitados"});
        }
        
        next();
    } catch (error) {
        return res.status(500).json({ message: "Falha ao tentar recuperar as informações, tente novamente"});
    }
}

module.exports = cepVerify;