const express = require('express')
const booksPaths = require('./routes/books')
const authorsPaths = require('./routes/authors')
const mongoose = require('mongoose')

// DB Connection
mongoose.connect('mongodb://localhost/bookStoreDB')
.then(()=>{console.log('Connection Succeefull')})
.catch((error)=> console.log('Failed Connection'))




// Init App
const app = express();

// Apply Middlewares
app.use(express.json())
// =====================================
// Routess

app.use('/api/books', booksPaths)
app.use('/api/authors', authorsPaths)





// =====================================

PORT = 4000
app.listen(PORT, () => {
    console.log(`Server is Running on PORT: ${PORT}`);

})


// app.post();
// app.put();
// app.delete();