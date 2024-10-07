const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    const { name, email, password, code } = req.body;

    if(!name || !email || !password || !code)
        return res.status(400).json({error: 'Insira todos os campos'});

    // Criptografar a senha com bcrypt
    const saltRounds = 10; // Número de saltos para o algoritmo, mais saltos significa mais segurança, mas também mais lento.
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    req.validatedData = { name, email, password: hashedPassword, code };

    next();
};  
    