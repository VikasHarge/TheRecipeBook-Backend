const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())


const SentJWT = (user, statusCode, res)=>{
    //Get Token
    const token = admin.getJWT();

    const options = {
        expires : new Date(
            Date.now()+process.env.COOKIES_EXPIRE* 24 * 60 * 60 * 1000
        ),
        httpOnly : true,
        withCredentials : true,
        sercue : true,
    }

    //Sending Cookies
    res.cookie('JWTtoken', token, options)
    res.status(statusCode).json({
        success : true,
        message : "Logged in succesfully",
        user,
        token,
    })

}

module.exports = SentJWT;