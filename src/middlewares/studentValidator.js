const PasswordHelper = require('../helpers/PasswordHelper');

module.exports = async (req, res, next) => {
    try {
        let { name, email, password, code, class_id } = req.body;
        password = password ? password : PasswordHelper.generateRandomPassword();
        const hashedPassword = await PasswordHelper.encrypt(password);

        if(!name || !email)
            return res.status(400).json({error: 'Insira todos os campos'});

        req.body = { name, email, hashedPassword, password, code, class_id };

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};  
    