const express = require('express')
const Joi = require('joi')

// Init App
const app = express();

// Apply Middlewares
app.use(express.json())

const books = [
    {
        "id": 1,
        "title": "Atomic Habits",
        "author": "James Clear",
        "genre": "Self-help",
        "publishedYear": 2018,
        "price": 15.99,
        "rating": 4.8,
        "inStock": true,
        "description": "An easy & proven way to build good habits and break bad ones.",
        "image": "https://example.com/images/atomic-habits.jpg"
    },
    {
        "id": 2,
        "title": "The Alchemist",
        "author": "Paulo Coelho",
        "genre": "Fiction",
        "publishedYear": 1988,
        "price": 12.5,
        "rating": 4.7,
        "inStock": true,
        "description": "A journey of self-discovery and following your dreams.",
        "image": "https://example.com/images/the-alchemist.jpg"
    },
    {
        "id": 3,
        "title": "Clean Code",
        "author": "Robert C. Martin",
        "genre": "Programming",
        "publishedYear": 2008,
        "price": 30.0,
        "rating": 4.9,
        "inStock": false,
        "description": "A handbook of agile software craftsmanship.",
        "image": "https://example.com/images/clean-code.jpg"
    },
    {
        "id": 4,
        "title": "Deep Work",
        "author": "Cal Newport",
        "genre": "Productivity",
        "publishedYear": 2016,
        "price": 18.75,
        "rating": 4.6,
        "inStock": true,
        "description": "Rules for focused success in a distracted world.",
        "image": "https://example.com/images/deep-work.jpg"
    },
    {
        "id": 5,
        "title": "Harry Potter and the Sorcerer's Stone",
        "author": "J.K. Rowling",
        "genre": "Fantasy",
        "publishedYear": 1997,
        "price": 14.2,
        "rating": 4.9,
        "inStock": true,
        "description": "The first book in the Harry Potter series.",
        "image": "https://example.com/images/harry-potter1.jpg"
    },
    {
        "id": 6,
        "title": "Think and Grow Rich",
        "author": "Napoleon Hill",
        "genre": "Finance",
        "publishedYear": 1937,
        "price": 10.99,
        "rating": 4.5,
        "inStock": false,
        "description": "A classic book on wealth and success mindset.",
        "image": "https://example.com/images/think-grow-rich.jpg"
    }
]

// http verbs
app.get('/', (req, res) => {
    res.send('Hello Hedaia')
});

app.get('/api/books', (req, res) => {

    res.status(200).json(books)
})
// ============================================
app.get('/api/books/:id', (req, res) => {

    // parsInt to convert value from string to int
    const book = books.find(book => book.id === parseInt(req.params.id))

    if (book)
        res.status(200).json(book)
    else
        res.status(404).json({ message: 'Book not Found!!' })
})
// ==============================================

app.post('/api/books', (req, res) => {
console.log(req.body);

  

   const schema = Joi.object({
    title: Joi.string().trim().min(3).max(200).required(),
    author: Joi.string().trim().min(3).max(200).required(),
    description: Joi.string().trim().min(3).max(500).required(),
    price: Joi.number().min(0).required(),
   })
const { error } = schema.validate(req.body);

if(error){
    return res.status(400).json({message: error.details[0].message})
}

   const newBook ={
    id:books.length +1,
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    
   }
books.push(newBook);

res.status(201).json(newBook)

})
// =====================================





// =====================================

PORT = 4000
app.listen(PORT, () => {
    console.log(`Server is Running on PORT: ${PORT}`);

})


// app.post();
// app.put();
// app.delete();