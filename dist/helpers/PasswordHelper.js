"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
class PasswordHelper {
    constructor() {
        this.size = 8;
        this.charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+<>?";
        this.password = "";
        this.saltRounds = 10;
    }
    // Método estático para gerar uma senha aleatória
    generateRandomPassword(size = 8) {
        this.size = size ? size : this.size;
        for (let i = 0; i < this.size; i++) {
            const randomIndex = Math.floor(Math.random() * this.charset.length);
            this.password += this.charset[randomIndex];
        }
        return this.password;
    }
    // Criptografar a senha com bcrypt
    encrypt(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.hash(password, this.saltRounds);
        });
    }
}
// Exporta a classe como padrão
exports.default = new PasswordHelper();
