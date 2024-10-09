import { NextFunction, Request, Response } from "express";
import PasswordHelper from "../helpers/PasswordHelper";

class UserValidator{
    async validate(req: Request, res: Response, next: NextFunction){
        try {
            let { name, email, password, code } = req.body;
            password = password ? password : PasswordHelper.generateRandomPassword();
            const hashedPassword = await PasswordHelper.encrypt(password);

            if(!name || !email || !code || !password || !hashedPassword)
                return res.status(400).json({error: 'Insira todos os campos'});

            req.body = { name, email, password, hashedPassword, code };

            next();
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new UserValidator();