class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);

        Object.setPrototypeOf(this, new.target.prototype)

        this.name = message
        this.statusCode = statusCode

        Error.captureStackTrace(this);

    }
    
}

module.exports = ErrorHandler
