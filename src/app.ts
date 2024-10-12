import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import courseRoutes from './routes/course';
import classesRoutes from './routes/class';
import studentsRoutes from './routes/student';
import teachersRoutes from './routes/teacher';
import coordinatorsRoutes from './routes/coordinator';
import auth from './middlewares/auth';
import './database/initializeModels'

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
    res.json("API Funcionando");
});

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
