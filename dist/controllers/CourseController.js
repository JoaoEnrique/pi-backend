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
const Course_1 = __importDefault(require("../models/Course"));
class CourseController {
    constructor() {
        this.model = Course_1.default;
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = yield this.model.findAll();
                return res.json(courses);
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { coordinator_id, name, period, is_annual, type_work } = req.body;
                // Cria o curso
                const course = yield this.model.create({
                    coordinator_id, name, period, type_work, is_annual
                });
                return res.json({ message: "Curso criado", course });
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { course_id } = req.params;
                const { coordinator_id, name, period, is_annual, type_work } = req.body;
                const course = yield this.model.findByPk(course_id); // Buscar o curso no banco
                // Verificar se o curso existe
                if (!course)
                    return res.status(404).json({ error: 'Curso não encontrado' });
                // Atualizar o curso
                yield course.update({
                    coordinator_id, name, period, is_annual, type_work
                });
                return res.json({ message: 'Curso atualizado com sucesso', course });
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { course_id } = req.params;
                if (!course_id)
                    return res.status(400).json({ error: 'ID não encontrado' });
                const course = yield this.model.findByPk(course_id);
                if (!course)
                    return res.status(400).json({ error: "Curso não encontrado" });
                yield course.destroy();
                return res.status(200).json({ message: "Curso apagado" });
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.default = new CourseController();
