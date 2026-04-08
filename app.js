const express = require('express')
const booksPaths = require('./routes/books')
const authorsPaths = require('./routes/authors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

// DB Connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log('Connection Succeefull')})
.catch((error)=> console.log('Failed Connection'))




// Init App
const app = express();

// Apply Middlewares
app.use(express.json())

app.use((req, res, next)=>{
    // console.log("Logging...");
    console.log(`${req.method} ${req.protocol}://${req.get('host')} ${req.originalUrl}`);
    next()
})
// =====================================
// Routess

app.use('/api/books', booksPaths)
app.use('/api/authors', authorsPaths)

// =====================================

PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is Running in ${process.env.NODE_ENV}Mode on PORT: ${PORT}`);

})


// app.post();
// app.put();
// app.delete();