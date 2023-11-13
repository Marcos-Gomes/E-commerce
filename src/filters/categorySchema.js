const yup = require('yup');
const { pt } = require('yup-locales');

yup.setLocale(pt);

const categorySchema = yup.object().shape({
    descricao: yup.string().required().trim()
})

module.exports = categorySchema;