const knex = require('../databaseConnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userAuthenticate = require('../features/userAuthenticate');

const userData = {
    async createUser(req, res){
        const {name, email, password} = req.body;

        try {
            const encryptedPassword = await bcrypt.hash(password, 10);
    
            let newUser = {
                name,
                email,
                password: encryptedPassword,
                created_at: new Date()
            }

            await knex('users').insert(newUser);

            return res.status(201).json({message: "Usuário criado com sucesso"});
        } catch (error) {
            return res.status(500).json({message: "Erro ao cadastrar o usuário verifique os dados e tente novamente"});
        }
    },
    async login(req, res){
        const { email, password } = req.body;

        try {
            let user = await userAuthenticate(email, password);

            delete user.created_at;
            delete user.password;
            
            const token = jwt.sign({ 
                id: user.id,
                name: user.name,
                email: user.email,
            }, process.env.JWT_PASS, { expiresIn: "8h" });            
            
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

            await knex('users').where({ id: req.user.id }).update(user);

            return res.status(201).json({ message: "Usuário atualizado com sucesso"});
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Erro ao atualizar o usuário. Verifique os dados e tente novamente."});
        }        
    }
}

module.exports = userData;