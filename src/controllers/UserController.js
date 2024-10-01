const User = require('../models/User')
const bcrypt = require('bcrypt');

module.exports = {
    async index(req, res){
        try {
            const users = await User.findAll();
            return res.json(users);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    },

    async store(req, res){
        try {
            const { name, email, password, user_type, code } = req.body;

            if(!name || !email || !password || !user_type || !code)
                return res.status(400).json({error: 'Insira todos os campos'});

            // Criptografar a senha com bcrypt
            const saltRounds = 10; // Número de saltos para o algoritmo, mais saltos significa mais segurança, mas também mais lento.
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const user = await User.create({
                name, email, password: hashedPassword, user_type, code
            })

            return res.json({message: "Usuário criado", user});
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    },

    async update(req, res) {
        try {
            const { user_id } = req.params;
            const { name, email, password, user_type, code } = req.body;

            // Verificar se o ID do usuário foi passado
            if (!user_id)
                return res.status(400).json({ error: 'ID do usuário não encontrado' });

            // Buscar o usuário no banco
            const user = await User.findByPk(user_id);

            // Verificar se o usuário existe
            if (!user)
                return res.status(404).json({ error: 'Usuário não encontrado' });


            // Criptografar a senha com bcrypt
            const saltRounds = 10; // Número de saltos para o algoritmo, mais saltos significa mais segurança, mas também mais lento.
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Atualizar o usuário com os novos dados
            await user.update({
                name, email, password: hashedPassword, user_type, code
            });

            return res.json({ message: 'Usuário atualizado com sucesso', user });
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    },


    async delete(req, res){
        try {
            const { user_id }  = req.params;

            if(!user_id)
                return res.status(400).json({error: 'ID não encontrado'});

            const user = await User.findByPk(user_id);

            if(!user)
                return res.status(400).json({error: "Usuário não encontrado"})

            await user.destroy();

            return res.status(200).json({message: "Usuário apagado"})
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
}