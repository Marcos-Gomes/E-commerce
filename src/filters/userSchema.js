const yup = require('yup');
const { pt } = require('yup-locales');

yup.setLocale(pt);

const userSchema = yup.object().shape({
    name: yup.string().required().trim(),
    email: yup.string().email().required().trim(),
    password: yup.string().required().min(8),
})

const updateSchema = yup.object().shape({
    name: yup.string().required().trim(),
    password: yup.string().min(8),
})

module.exports = {userSchema, updateSchema};