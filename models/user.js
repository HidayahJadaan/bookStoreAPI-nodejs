const mongoose = require('mongoose');
const Joi = require('joi')



const userSchema = new mongoose.Schema({

    email:{
        type: String,
        required:true,
        trim:true,
        minLength:5,
        maxLength:100,
        unique:true
    },

    username:{
        type: String,
        required:true,
        trim:true,
        minLength:2,
        maxLength:200,
        
    },
    password:{
        type: String,
        required:true,
        trim:true,
        minLength:6,
       
    },
    isAdmin:{
        type:Boolean,
       default:false
    },
  
},{timestamps:true})

const User= mongoose.model("User", userSchema)



// Validation
// ===========================================
// Validate Create Book
function validateRegisterUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required(),
    username: Joi.string().trim().min(2).max(200).required(),
    password: Joi.string().trim().min(6).required(),
    isAdmin: Joi.bool()
  });

  return schema.validate(obj);
}
// ========================================
// Validate login user
function validateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required(),
   
    password: Joi.string().trim().min(6).required(),
  
  });

  return schema.validate(obj);
}
// ===================================
// Validate login user
function validateUpdateUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100),
    username: Joi.string().trim().min(2).max(200),
    password: Joi.string().trim().min(6),
    isAdmin: Joi.bool()
  });

  return schema.validate(obj);
}
// ===========================================
module.exports = {
    User,
    validateLoginUser,
    validateRegisterUser,
    validateUpdateUser
}
