const app = require('./app')
const dotenv = require('dotenv')

// DataBase Connection Import
const connectToDatabase = require('./config/database')

// Use Env 
dotenv.config({path:'./config/config.env'})

//Calling Data Base Connection Function
connectToDatabase();



//Connect Server to port
const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is Running at http:/${process.env.HOST}:${process.env.PORT}`);
})