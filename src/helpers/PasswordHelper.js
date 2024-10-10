const bcrypt = require('bcrypt');

class PasswordHelper {
    constructor() {
        this.size = 8;
        this.charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+<>?";
        this.saltRounds = 10;
    } 

    // Função para gerar uma senha aleatória
    generateRandomPassword(length = 8) {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+<>?";
        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }

    async encrypt(password){
        return await bcrypt.hash(password, this.saltRounds);
    }
}

module.exports = new PasswordHelper();