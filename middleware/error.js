const ErrorHandler = require('../utils/errorhandler')


module.exports = (err, req, res, next)=>{

    err.message = err.message || "Enternal Error"
    err.statusCode = err.statusCode || 404

    //Cast Error Handler
    if(err.name === "CastError"){
        const message = `Resource not Found, ${err.path}`
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success : false,
        error : err
    })
}