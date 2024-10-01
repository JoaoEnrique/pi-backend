const app = require('./app')
require('dotenv').config()
const PORT = process.env.PORT || 3000;
require('./database/connection')

app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`))