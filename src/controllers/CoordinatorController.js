import User from '../models/User.js';
import bcrypt from 'bcrypt';

class CoordinatorController {
    async index(req, res){
        try {
            const users = await User.findAll({
                where:{
                    user_type: 'coordinator'
                }
            });
            return res.json(users);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async store(req, res){
        try {
            const {  name, email, password, code } = req.validatedData;

            const user = await User.create({
                name, email, password, user_type: 'coordinator', code
            })

            return res.json({message: "Coordenador criado", user});
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async update(req, res) {
        try {
            const { user_id } = req.params;
            const { name, email, password, code } = req.validatedData;

            // Verificar se o ID do Coordenador foi passado
            if (!user_id)
                return res.status(400).json({ error: 'ID do Coordenador não encontrado' });

            // Buscar o Coordenador no banco
            const user = await User.findByPk(user_id);

            // Verificar se o Coordenador existe
            if (!user)
                return res.status(404).json({ error: 'Coordenador não encontrado' });

            // Atualizar o Coordenador com os novos dados
            await user.update({
                name, email, password, code
            });

            return res.json({ message: 'Coordenador atualizado com sucesso', user });
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }


    async delete(req, res){
        try {
            const { user_id }  = req.params;

            if(!user_id)
                return res.status(400).json({error: 'ID não encontrado'});

            const user = await User.findByPk(user_id);

            if(!user)
                return res.status(400).json({error: "Coordenador não encontrado"})

            await user.destroy();

            return res.status(200).json({message: "Coordenador apagado"})
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
}

export default new CoordinatorController();