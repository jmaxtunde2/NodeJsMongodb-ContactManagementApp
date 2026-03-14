const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const bcryt = require("bcrypt");
const jwt = require("jsonwebtoken");
// @desc Register a new user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body; // Destructure the username, email, and password from the request body
    if(!username || !email || !password) {
        res.status(400);
        throw new Error("Please fill in all fields");
    }

    const userExists = await User.findOne({email}); // Check if a user with the provided email already exists in the database
    if(userExists) {
        res.status(400);
        throw new Error("User already exists");
    } 
    const HashedPassword = await bcryt.hash(password, 10); // Hash the password using bcrypt with a salt rounds of 10
    // console.log(HashedPassword);
    const user = await User.create({
        username,
        email,
        password: HashedPassword
    }); // Create a new user in the database with the provided username, email, and password
    console.log(user);
    res.status(201).json({
        "message": "User created successfully",
        "_id": user._id,
        "username": user.username,
        "email": user.email
    });
});

// @desc login a new user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body; // Destructure the email and password from the request body
    if(!email || !password) {
        res.status(400);
        throw new Error("Please fill in all fields");
    }
    const user = await User.findOne({email}); // Check if a user with the provided email exists in the database
    if(!user) {
        res.status(400);
        throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcryt.compare(password, user.password); // Compare the provided password with the hashed password stored in the database
    if(!isPasswordValid) {
        res.status(400);
        throw new Error("Invalid credentials");
    }
    const token = jwt.sign(
        {
            user:{_id: user._id, email: user.email, username: user.username}
        }, process.env.ACCESS_TOKEN_SECRET, 
        {expiresIn: "1d"}
    ); // Generate a JWT token with the user's ID as the payload and a secret key from the environment variables, with an expiration time of 1 day
    res.status(200).json({
        "message": "User logged in successfully",
        "token": token
    });
});

// @desc Get current user profile
// @route GET /api/users/current
// @access Private
const getCurrentUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({
        "message": "User profile fetched successfully",
        "user": req.user
    });
});




module.exports = {
    registerUser,
    loginUser,
    getCurrentUserProfile
};