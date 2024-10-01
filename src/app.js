require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors())
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => res.json("API Funcionando"))

// Import das rotas
const courseRoutes = require('./routes/course');
const usersRoutes = require('./routes/user'); 
const classesRoutes = require('./routes/class'); 

// Rotas
app.use('/api/courses', courseRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/classes', classesRoutes);


// erro 404
app.use((req, res, next) => {
    res.status(404).json({
      error: 'Rota não encontrada',
      status: 404
    });
});

module.exports = app;