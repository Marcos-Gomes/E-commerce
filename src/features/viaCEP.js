const axios = require('axios');

const viaCepApi = axios.create({
    baseURL: 'https://viacep.com.br/ws/'
});

module.exports = viaCepApi;