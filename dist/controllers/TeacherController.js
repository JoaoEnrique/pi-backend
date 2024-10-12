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
const User_1 = __importDefault(require("../models/User"));
const EmailController_1 = __importDefault(require("./EmailController"));
class TeacherController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User_1.default.findAll({
                    where: {
                        user_type: 'teacher'
                    }
                });
                return res.json(users);
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, hashedPassword, code } = req.body;
                const user = yield User_1.default.create({
                    name, email, password: hashedPassword, user_type: 'teacher', code
                });
                EmailController_1.default.sendPasswordEmail(user, password);
                return res.json({ message: "Professor criado", user });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ error: error.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = req.params;
                const { name, email, hashedPassword, code } = req.body;
                // Verificar se o ID do Professor foi passado
                if (!user_id)
                    return res.status(400).json({ error: 'ID do Professor não encontrado' });
                // Buscar o Professor no banco
                const user = yield User_1.default.findByPk(user_id);
                // Verificar se o Professor existe
                if (!user)
                    return res.status(404).json({ error: 'Professor não encontrado' });
                // Atualizar o Professor com os novos dados
                yield user.update({
                    name, email, password: hashedPassword, code
                });
                return res.json({ message: 'Professor atualizado com sucesso', user });
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = req.params;
                if (!user_id)
                    return res.status(400).json({ error: 'ID não encontrado' });
                const user = yield User_1.default.findByPk(user_id);
                if (!user)
                    return res.status(400).json({ error: "Professor não encontrado" });
                yield user.destroy();
                return res.status(200).json({ message: "Professor apagado" });
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.default = new TeacherController();
