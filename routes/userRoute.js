const express = require('express');


const {
    registerUser,
    loginUser,
    getUserDetails,
    saveRecipe,
    logoutUser
} = require('../controlls/userControllers')

const  { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");



const router = express.Router();


//Route to create new user
router.route("/register").post(registerUser);

//Login Route
router.route("/login").post(loginUser);

//Logout Route
router.route("/logout").get(logoutUser);

//Get current user Details
router.route("/me").get(isAuthenticatedUser, getUserDetails);

//Save Recipes
router.route('/saveRecipe').post(isAuthenticatedUser, saveRecipe)

module.exports = router
