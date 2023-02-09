const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please Enter Your Name"],
        maxLength: [30, "hushhh... Name is too long, please short it down"],
        minLength: [3, "tooo short, Please enter correct name"],
    },
    email : {
        type : String,
        required : true,
        unique : [true, "Email Already Registered"],
        validate : [validator.isEmail, 'Please Enter Valid Email Id']
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        default : 'user'
    },
    savedRecipes : [
        {
            title : {
                type : String,
            },
            image : {
                type : String,
            },
            recipeId : {
                type : Number,
            }
        },
    ],
    createdAt : {
        type : Date,
        default : Date.now(),
    },
    resetPasswordToken : String,
    resetPasswordExpire : Date,
})

//Encrypt password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 12);
});

//JWT Generator Methode
//To Save in cookies
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };
  
  //Password Comparing Methode
  userSchema.methods.comparePassword = async function (incomingPassord) {
    return await bcrypt.compare(incomingPassord, this.password);
  };


module.exports = mongoose.model('users', userSchema)