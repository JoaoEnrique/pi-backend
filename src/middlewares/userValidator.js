const PasswordHelper = require('../helpers/PasswordHelper');

module.exports = async (req, res, next) => {
    let { name, email, password, code } = req.body;
    password = password ? password : PasswordHelper.generateRandomPassword();
    const hashedPassword = await PasswordHelper.encrypt(password);

    if(!name || !email || !code)
        return res.status(400).json({error: 'Insira todos os campos'});

    req.validatedData = { name, email, password, hashedPassword, code };

    next();
}; 