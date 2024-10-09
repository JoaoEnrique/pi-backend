import { Request, Response, NextFunction } from 'express';
import PasswordHelper from '../helpers/PasswordHelper';

class StudentValidator{
    async validate(req: Request, res: Response, next: NextFunction){
        try {
            let { name, email, password, code } = req.body;
            password = password ? password : PasswordHelper.generateRandomPassword();
            const hashedPassword = await PasswordHelper.encrypt(password);
    
            if(!name || !email || !hashedPassword || !password)
                return res.status(400).json({error: 'Insira todos os campos'});
    
            req.body = { name, email, hashedPassword, password, code };
    
            next();
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new StudentValidator();