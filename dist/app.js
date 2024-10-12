"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const course_1 = __importDefault(require("./routes/course"));
const class_1 = __importDefault(require("./routes/class"));
const student_1 = __importDefault(require("./routes/student"));
const teacher_1 = __importDefault(require("./routes/teacher"));
const coordinator_1 = __importDefault(require("./routes/coordinator"));
const auth_1 = __importDefault(require("./middlewares/auth"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.json("API Funcionando");
});
// Rotas
app.use('/api/courses', auth_1.default, course_1.default);
app.use('/api/classes', auth_1.default, class_1.default);
app.use('/api/students', auth_1.default, student_1.default);
app.use('/api/teachers', auth_1.default, teacher_1.default);
app.use('/api/coordinators', auth_1.default, coordinator_1.default);
// Erro 404
app.use((req, res, next) => {
    res.status(404).json({
        error: 'Rota não encontrada',
        status: 404
    });
});
exports.default = app;
