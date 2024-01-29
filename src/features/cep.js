const viaCepApi = require('../features/viaCEP');

const cepEncontrado = async (data) => {
    const cep = await viaCepApi.get(`/${data}/json`);
            
    return cep;
}

module.exports = cepEncontrado;