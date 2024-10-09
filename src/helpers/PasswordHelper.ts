import bcrypt from 'bcrypt'

class PasswordHelper {
    private size: number = 8;
    private charset: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+<>?";
    private password = "";
    private saltRounds = 10;

    // Método estático para gerar uma senha aleatória
    public generateRandomPassword(size: number = 8): string {
        this.size = size ? size : this.size;

        for (let i = 0; i < this.size; i++) {
            const randomIndex = Math.floor(Math.random() * this.charset.length);
            this.password += this.charset[randomIndex];
        }
        return this.password;
    }

    // Criptografar a senha com bcrypt
    public async encrypt(password: string){
        return await bcrypt.hash(password, this.saltRounds);
    }
}

// Exporta a classe como padrão
export default new PasswordHelper();