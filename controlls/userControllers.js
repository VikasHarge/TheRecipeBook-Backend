const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const crypto = require("crypto");

const User = require("../models/userModel");
const SentJWT = require("../utils/jwt");

//User Registration
exports.registerUser = catchAsyncError(async (req, res, next) => {

  const { name, email, password } = req.body;

  console.log(name , email, password);

  const user = await User.findOne({ email: email });

  if (user) {
    return next(new ErrorHandler("Email Is already Registered"));
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });

  SentJWT(newUser, 201, res);
});

// Login FUnction
exports.loginUser = catchAsyncError(async (req, res, next) => {
  console.log("login user call");
const { email, password } = req.body;

//Checking if pass and email entered
if (!password || !email) {
  return next(new ErrorHandler("Please Enter Email or Password", 401));
}

//Search for user in dataBase
const user = await User.findOne({ email: email }).select("+password");

if (!user) {
  return next(
    new ErrorHandler("Invalid Password or Email, Please Check", 401)
  );
}

const isPassMatched = await user.comparePassword(password);

if (!isPassMatched) {
  return next(
    new ErrorHandler("Invalid Password or Email, Please Check", 401)
  );
}

//by default reset pass token is undifened
user.resetPasswordToken = undefined;
user.resetPasswordExpire = undefined;
await user.save();

SentJWT(user, 200, res);
})

//Logout Funtion
exports.logoutUser = catchAsyncError(async (req, res, next) => {

    console.log("res cookie", res.cookie);
  
    const options = {
      expires: new Date(Date.now()),
      httpOnly: true,
      withCredentials: true,
    }
    res.cookie('recipeUserToken', null, options);
    res.status(200).json({
      success: true,
      message: "Logged Out Successfully",
    });
  });

  //Get User Details
exports.getUserDetails = catchAsyncError( async(req, res, next)=>{

    const user = await User.findById(req.user.id);
  
    res.status(200).json({
      success : true,
      message : "Logged in succesfully",
      user,
    })
  
  })


  //Save Recipe
  exports.saveRecipe = catchAsyncError( async (req, res, next)=>{

    const {recipeName, recipeImage, recipeId} = req.body;

    const newRecipe = {
        title : recipeName,
        image : recipeImage,
        recipeId : recipeId,
    }

    const user = await User.findById(req.user.id);

    if(!user){
        return next(ErrorHandler("Please Login To add to fevourite"));
    }

    user.savedRecipes.push(newRecipe);

    await user.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
        message : "recipe Added"
      });

  })
  
