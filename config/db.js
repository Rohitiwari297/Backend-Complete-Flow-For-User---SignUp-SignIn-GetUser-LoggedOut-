
const mongoose = require('mongoose');

const dataBaseConnection = async ()=>{
    mongoose
    .connect('mongodb+srv://RavanTripathi:URZWlLLUENIp5Gqt@cluster0.zel5eis.mongodb.net/RavanData')
    .then((conn)=>{
        console.log(`Connected to DB: ${conn.connection.host}`)
        
    })
    .catch((err)=>{
        console.log(err.message)
        process.exit(1)
    })
}

module.exports = dataBaseConnection;