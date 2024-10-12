"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Carregar variáveis do .env
// Criação do transportador
const transporter = nodemailer_1.default.createTransport({
    service: process.env.EMAIL_SERVICE, // ou outro serviço de e-mail
    auth: {
        user: process.env.EMAIL_USER, // seu e-mail do .env
        pass: process.env.EMAIL_PASS, // sua senha de app do .env
    },
});
// Exporta o transportador para ser usado em outros arquivos
exports.default = transporter;
