const express = require('express')

const router = express.Router();

const { Author , validateCreateAuthor, validateUpdateAuthor} = require('../models/author')
const asyncHandler = require('express-async-handler')
// =====================================

const authors = [
    {
        id: 1,
        firstName: "Hedaia",
        lastName: "Khalil",
        nationality: "Jordanian",
        image: "defualt-image.png",
    },
]


// ======================================
router.get('/', asyncHandler(
    async (req, res) => {

    // res.status(200).json(authors)

    // const authorsList = await Author.find();
    // res.status(200).json(authorsList)

    
        const authorsList = await Author.find();
        res.status(200).json(authorsList)
    

}
))// ======================================
router.get('/:id', async (req, res) => {

    // parsInt to convert value from string to int
    // const author = authors.find(author => author.id === parseInt(req.params.id))

    try {

        const author = await Author.findById(req.params.id)
        if (author)
            res.status(200).json(author)
        else
            res.status(404).json({ message: 'author not Found!!' })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })

    }
    // if (author)
    //     res.status(200).json(author)
    // else
    //     res.status(404).json({ message: 'author not Found!!' })



})// ======================================

router.post('/', async (req, res) => {
    console.log(req.body);

    const { error } = validateCreateAuthor(req.body)

    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    try {
        const author = new Author(
            {
                // id: authors.length + 1,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                nationality: req.body.nationality,
                image: req.body.image,


            }
        )
        // authors.push(author);
        const result = await author.save();

        // res.status(201).json(author)
        res.status(201).json(result)

    } catch (error) {

        console.log(error);
        res.status(500).json({ message: "Somthing went errror" })
    }
})
// ======================================
router.put('/:id', async (req, res) => {

    const { error } = validateUpdateAuthor(req.body);


    if (error) {

        return res.status(400).json({ message: error.details[0].message })
    }


    // const author = authors.find(b => b.id === parseInt(req.params.id))
    // if (author) {
    //     res.status(200).json({ message: 'author has been updated' })
    // }
    // else {
    //     res.status(404).json({ message: 'author not Found!!' })

    // }


    try {
        const author = await Author.findByIdAndUpdate(req.params.id, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                nationality: req.body.nationality,
                image: req.body.image,
            }
        }, { new: true })


        res.status(200).json(author)

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })

    }



})
// ======================================
router.delete('/:id', async (req, res) => {


    // const author = authors.find(b => b.id === parseInt(req.params.id))
    try {
        const author = await Author.findById(req.params.id)
        if (author) {
            await Author.findByIdAndDelete(req.params.id)

            res.status(200).json({ message: 'author has been deleted' })
        }
        else {
            res.status(404).json({ message: 'author not Found!!' })

        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })

    }


})

// ==================================================



module.exports = router;