const logger =(req, res, next)=>{
    // console.log("Logging...");
    console.log(`${req.method} ${req.protocol}://${req.get('host')} ${req.originalUrl}`);
    next()
}


module.exports = logger