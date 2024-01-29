const yup = require('yup');
const { pt } = require('yup-locales');

yup.setLocale(pt);

const customerSchema = yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().email().required().trim(),
    cpf: yup.number().integer().required(),
    cep: yup.number().integer().required(),
    senha: yup.string().required(),
});

module.exports = customerSchema;