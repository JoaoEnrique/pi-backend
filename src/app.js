import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import courseRoutes from './routes/course.js'; // Ajuste a extensão do arquivo se necessário
import classesRoutes from './routes/class.js'; // Ajuste a extensão do arquivo se necessário
import studentsRoutes from './routes/student.js'; // Ajuste a extensão do arquivo se necessário
import teachersRoutes from './routes/teacher.js'; // Ajuste a extensão do arquivo se necessário
import coordinatorsRoutes from './routes/coordinator.js'; // Ajuste a extensão do arquivo se necessário
import auth from './middlewares/auth.js'

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => res.json("API Funcionando"));

// Rotas
app.use('/api/courses', auth, courseRoutes);
app.use('/api/classes', auth, classesRoutes);
app.use('/api/students', auth, studentsRoutes);
app.use('/api/teachers', auth, teachersRoutes);
app.use('/api/coordinators', auth, coordinatorsRoutes);

// Erro 404
app.use((req, res, next) => {
    res.status(404).json({
        error: 'Rota não encontrada',
        status: 404
    });
});

export default app;
