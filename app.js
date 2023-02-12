const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middleware/error')



// Express Module
const app = express();

//Body Parser
app.use(bodyParser.urlencoded({extended : true}))

app.use(express.json())

//Cors Added
app.use(cors({origin : true, credentials : true, optionsSuccessStatus: 200}))

//Cookie-parser
app.use(cookieParser())

//Import Router
const userRoute  = require('./routes/userRoute')


app.use('/user', userRoute)


//Middle Ware to handle Error
app.use(errorMiddleware)


module.exports = app;