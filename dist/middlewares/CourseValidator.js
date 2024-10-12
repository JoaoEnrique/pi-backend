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
class CourseValidation {
    validate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { coordinator_id, name, period, is_annual, type_work } = req.body;
            // Verificar se todos os campos obrigatórios foram passados
            if (!coordinator_id || !name || !period || !is_annual || !type_work) {
                return res.status(400).json({ error: 'Insira todos os campos' });
            }
            // Verificar se o coordenador existe
            const coordinator = yield User_1.default.findByPk(coordinator_id);
            if (!coordinator) {
                return res.status(400).json({ error: 'Coordenador não encontrado' });
            }
            req.body = { coordinator_id, name, period, is_annual, type_work };
            next(); // Chama o próximo middleware ou controlador
        });
    }
}
exports.default = new CourseValidation();
