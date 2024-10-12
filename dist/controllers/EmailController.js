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
const nodemailerConfig_1 = __importDefault(require("../config/nodemailerConfig"));
class EmailController {
    constructor() {
        var _a;
        this.sendEmail = ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.SEND_MAIL) || "0";
    }
    sendPasswordEmail(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.sendEmail == "1") {
                const mailOptions = {
                    from: process.env.EMAIL_USER, // seu e-mail do .env
                    to: user.email, // e-mail do destinatário
                    subject: 'Sua nova senha gerada',
                    text: `Olá ${user.name},\n\nSua nova senha é: ${password}\n\nPor favor, altere sua senha após o primeiro acesso.\n\nAtenciosamente,\nSua Equipe.`,
                };
                try {
                    yield nodemailerConfig_1.default.sendMail(mailOptions);
                }
                catch (error) {
                    // throw new Error('Erro ao enviar e-mail com a senha');
                }
            }
        });
    }
}
exports.default = new EmailController();
