const knex = require('../databaseConnection');
const customerAuthenticate = require('../features/customerAuthenticate');
const dataVerify = require('../features/dataVerify');
const cepEncontrado = require('../features/cep');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const customerController = {
    async createCustomer(req, res){
        try {
            const { nome, email, cpf, cep, numero, complemento, senha } = req.body;
            
            const cepValido = await cepEncontrado(cep);        
            
            if(cepValido.data.erro == true){
                return res.status(400).json({ message: "Favor utilizar um CEP válido"});
            };

            const encryptedPassword = await bcrypt.hash(senha, 10);

            const newCustomer = {
                nome,
                email,
                cpf,
                cep,
                rua: cepValido.data.logradouro,
                numero,
                complemento,
                bairro: cepValido.data.bairro,
                cidade: cepValido.data.localidade,
                estado: cepValido.data.uf,
                senha: encryptedPassword,
            };

            await knex('clientes').insert(newCustomer);
        
            return res.status(200).json({message: "Cadastro realizado com sucesso!"});
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Falha ao tentar criar o usuário, verifique os dados e tente novamente"});
        }
    },

    async loginCustomer (req, res){
        const { email, senha } = req.body;

        try {
            let customer = await customerAuthenticate(email, senha);

            delete customer.senha;
            delete customer.cpf;
            delete customer.cep;
            delete customer.rua;
            delete customer.numero;
            delete customer.complemento;
            delete customer.bairro;
            delete customer.cidade;
            delete customer.estado;

            const token = jwt.sign({ 
                id: customer.id,
                nome: customer.nome,
                email: customer.email,
            }, process.env.JWT_PASS, { expiresIn: "8h" });

            return res.status(200).json({ customer, token });
        } catch (error) {
            return res.status(401).json({ message: error.message});
        }
    },

    async updateCustomer(req, res){
        const { id } = req.params;
        const { nome, email, cpf, cep, numero, complemento, senha } = req.body;    

        const customerExists = await dataVerify('clientes', 'id', id);

        if(!customerExists){
            return res.status(404).json({ message: "Cadastro não localizado, verifique e tente novamente"});
        }

        const encryptedPassword = await bcrypt.hash(senha, 10);

        const cepValido = await cepEncontrado(cep);        
            
        if(cepValido.data.erro == true){
            return res.status(400).json({ message: "Favor utilizar um CEP válido"});
        };

        const uptadeCustomer = {
            nome,
            email,
            cpf,
            cep,
            rua: cepValido.data.logradouro,
            numero,
            complemento,
            bairro: cepValido.data.bairro,
            cidade: cepValido.data.localidade,
            estado: cepValido.data.uf,
            senha: encryptedPassword,
        };

        await knex('clientes').update(uptadeCustomer);

        return res.status(201).json({ message: "Cliente Atualizado com Sucesso" });
    }
}

module.exports = customerController;