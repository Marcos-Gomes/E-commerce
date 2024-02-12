const knex = require('../databaseConnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userAuthenticate = require('../features/userAuthenticate');
const sendEmail = require('../features/mailSend');

const userData = {
    async createUser(req, res){
        const {nome, email, senha} = req.body;

        try {
            const encryptedPassword = await bcrypt.hash(senha, 10);
    
            let newUser = {
                nome,
                email,
                senha: encryptedPassword,
                data_criacao: new Date()
            }

            await knex('usuarios').insert(newUser);

            return res.status(201).json({message: "Usuário criado com sucesso"});
        } catch (error) {
            return res.status(500).json({message: "Erro ao cadastrar o usuário verifique os dados e tente novamente"});
        }
    },
    async login(req, res){
        const { email, senha } = req.body;

        try {
            let user = await userAuthenticate(email, senha);

            delete user.data_criacao;
            delete user.senha;
            
            const token = jwt.sign({ 
                id: user.id,
                nome: user.name,
                email: user.email,
            }, process.env.JWT_PASS, { expiresIn: "8h" });

            const subject = "Você acabou de fazer login";
            const text = "Você fez login, se não foi você bloqueie sua conta agora";

            await sendEmail(email, subject, text);

            return res.status(200).json({ user, token });
        } catch (error) {
            return res.status(401).json({ message: error.message});
        }        
    },
    async updateUser(req, res){
        const { name, email, password } = req.body;

        try {
            const encryptedPassword = await bcrypt.hash(password, 10);

            let user = {
                name,                
                password: encryptedPassword
            }

            await knex('usuarios').where({ id: req.user.id }).update(user);

            return res.status(201).json({ message: "Usuário atualizado com sucesso"});
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Erro ao atualizar o usuário. Verifique os dados e tente novamente."});
        }        
    }
}

module.exports = userData;