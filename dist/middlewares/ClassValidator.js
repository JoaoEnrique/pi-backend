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
const Course_1 = __importDefault(require("../models/Course"));
class ClassValidator {
    validate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { semester, teacher_id, course_id } = req.body;
            // Verificar se todos os campos obrigatórios foram passados
            if (!semester || !teacher_id || !course_id)
                return res.status(400).json({ error: 'Insira todos os campos' });
            const user = yield User_1.default.findByPk(teacher_id); // Verificar se o professor existe
            const course = yield Course_1.default.findByPk(course_id); // Verificar se o curso existe
            if (!user)
                return res.status(400).json({ error: 'Professor não encontrado' });
            if (!course)
                return res.status(400).json({ error: 'Curso não encontrado' });
            req.body = { semester, teacher_id, course_id };
            next();
        });
    }
    ;
}
exports.default = new ClassValidator();
