const yup = require('yup');
const { pt } = require('yup-locales');

yup.setLocale(pt);

const productSchema = yup.object().shape({
    descricao: yup.string().required().trim(),
    quantidade_estoque: yup
    .number()
    .typeError('O campo quantidade_estoque deve ser um número')
    .integer('O número de quantidade_estoque deve ser inteiro')
    .required('O campo quantidade_estoque é obrigatório'),
    valor_produto: yup
    .number()
    .typeError('O campo valor_produto deve ser um número')
    .integer('O número de valor_produto deve ser inteiro')
    .required('O campo valor_produto é obrigatório'),
    categorias_id: yup
    .number()
    .typeError('O campo categorias_id deve ser um número')    
    .required('O campo categorias_id é obrigatório'),
});

module.exports = productSchema;