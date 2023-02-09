const express = require('express');


const {
    registerUser,
    loginUser,
    getUserDetails,
    saveRecipe
} = require('../controlls/userControllers')

const  { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");



const router = express.Router();


//Route to create new user
router.route("/register").post(registerUser);

//Login Route
router.route("/login").post(loginUser);

//Get current user Details
router.route("/me").get(isAuthenticatedUser, getUserDetails);

//Save Recipes
router.route('/saveRecipe').get(isAuthenticatedUser, saveRecipe)

module.exports = router
