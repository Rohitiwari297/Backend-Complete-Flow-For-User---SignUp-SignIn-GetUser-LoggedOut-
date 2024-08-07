
const express = require('express')

const app = express();

//Enable route File
const authRouter = require('./routers/authRouter')

//Enable DataBase File
const dataBaseConnection = require('./config/db.js')

//Enable Cookie Parser
const cookieParser = require('cookie-parser')

//Enable Cross origin Request
const cors = require('cors');

//init DB
dataBaseConnection()

//middelwares
app.use(express.json());
app.use(cookieParser());

//using Cors for Accessing My APIs to UI site
app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials: true
}))

app.use('/api/auth', authRouter)

app.use('/', (req, res)=>{
    res.status(200).json({
        data: 'JWTauth server'
    })
})


module.exports = app;