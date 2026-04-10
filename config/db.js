const mongoose = require('mongoose')

async function connectToDB(){

  await  mongoose.connect(process.env.MONGO_URI)
    .then(()=>{console.log('Connection Succeefull')})
    .catch((error)=> console.log('Failed Connection'))
    
    
}

module.exports = connectToDB;