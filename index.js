
const PORT = process.env.PORT || 5000;
require('dotenv').config()

const app = require('./app.js')

app.listen(PORT, ()=>{
    console.log(`Sever is listening at http://localhost:${PORT}`)
})