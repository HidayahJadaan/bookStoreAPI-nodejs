const { model } = require("mongoose");

// NOT FOUND MIDDLEWARE
const notFpund = (err, req,res,next)=>{

    const error= new Error(`Not Found - ${req.originalUrl}`)


    res.status(400);
    next(error);

};

// ===================================
const errorHandler = (err, req,res,next)=>{

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({message: err.message})

}

module.exports = {
    notFpund,
    errorHandler
}