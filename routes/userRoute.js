const express = require('express');


const {
    registerUser
} = require('../controlls/userControllers')



const router = express.Router();


//Route to create new user
router.route("/register").post(registerUser);

//Login Route
router.route("/login").post(loginUser);

//Get current user Details
router.route("/me").get(isAuthenticatedUser, getUserDetails);




module.exports = router
