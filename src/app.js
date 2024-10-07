const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const courseRoutes = require('./routes/course');
const classesRoutes = require('./routes/class');
const studentsRoutes = require('./routes/student');
const teachersRoutes = require('./routes/teacher');
const coordinatorsRoutes = require('./routes/coordinator');
const auth = require('./middlewares/auth');

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

module.exports = app;
