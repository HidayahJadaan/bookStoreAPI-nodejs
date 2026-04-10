const express = require('express')
// const booksPaths = require('./routes/books')
// const authorsPaths = require('./routes/authors')
// const authPaths = require('./routes/auth')
// const usersPaths = require('./routes/users')

const logger = require('./middlewares/logger')
const dotenv = require('dotenv').config();
const { notFpund, errorHandler } = require('./middlewares/errors')
const connectToDB = require('./config/db')

// dotenv.config()

// DB Connection
// mongoose.connect(process.env.MONGO_URI)
// .then(()=>{console.log('Connection Succeefull')})
// .catch((error)=> console.log('Failed Connection'))

connectToDB();


// Init App
const app = express();

// Apply Middlewares
app.use(express.json())

// app.use((req, res, next)=>{
//     // console.log("Logging...");
//     console.log(`${req.method} ${req.protocol}://${req.get('host')} ${req.originalUrl}`);
//     next()
// })

app.use(logger)

// =====================================
// Routess

app.use('/api/books', require('./routes/books'))
app.use('/api/authors', require('./routes/authors'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/users'))
// app.use('/api/users', usersPaths)

// =====================================
// // NOT FOUND MIDDLEWARE
// app.use((err, req,res,next)=>{

//     const error= new Error(`Not Found - ${req.originalUrl}`)


//     res.status(400);
//     next(error);

// });
// =====================================
// ERROR HANDLER MIDDLEWARE"

// app.use((err, req,res,next)=>{

//     const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

//     res.status(statusCode).json({message: err.message})

// });

app.use(notFpund)
app.use(errorHandler)


// =====================================

PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is Running in ${process.env.NODE_ENV}Mode on PORT: ${PORT}`);

})


// app.post();
// app.put();
// app.delete();