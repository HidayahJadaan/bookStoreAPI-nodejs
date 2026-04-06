const express = require('express')
const booksPaths = require('./routes/books')


// Init App
const app = express();

// Apply Middlewares
app.use(express.json())
// =====================================
// Routess

app.use('/api/books', booksPaths)





// =====================================

PORT = 4000
app.listen(PORT, () => {
    console.log(`Server is Running on PORT: ${PORT}`);

})


// app.post();
// app.put();
// app.delete();