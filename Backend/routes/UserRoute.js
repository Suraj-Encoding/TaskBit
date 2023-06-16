const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//model imports
const User = require("../models/UserModel");

const SECRET = "idhiadhkladkndkan980e7070270928093uhlwndkndknakdnad";



const router = express.Router();

// # Get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong!" });
    }
}


// # Login
const login = async (req, res) => {
    const { email, password } = req.body;

    let errors = {};

    if (email.trim() === "") {
        errors.email = "Email cannot be empty";
    }
    if (password.trim() === "") {
        errors.password = "Password cannot be empty";
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }


    try {
        const user = await User.findOne({ email: email });
        if (user === null) {
            return res.status(400).json({ error: "Email/Password is wrong." });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Email/Password is wrong." });
        }

        const token = jwt.sign(email, SECRET);

        return res.status(200).json({
            user: {
                _id: user._id,
                email: user.email
            },
            token: token
        });


    } catch (error) {
        return res.status(500).json({ error: "Something went wrong!" });
    }
}

// # Register
const register = async (req, res) => {
    const { email, password, confirmPassword, name, pet } = req.body;

    let errors = {};

    if (email.trim() === "") {
        errors.email = "Email cannot be empty";
    }
    if (password.trim() === "") {
        errors.password = "Password cannot be empty";
    }
    if (pet.trim() === "") {
        errors.pet = "Pet name cannot be empty";
    }
    if (password != confirmPassword) {
        errors.error = "Password and confirm password does not match."
    }

    try {
        const user = await User.findOne({ email: email });
        if (user !== null) {
            return res.status(400).json({ error: "Email already exists" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong!" });
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }

    try {


        let encodedPassword = await bcrypt.hash(password, 6);
        const userObj = new User({
            email: email,
            password: encodedPassword,
            name: name,
            pet: pet
        });
        const savedUser = await userObj.save();
        return res.status(201).json(savedUser);
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong!" });
    }
}

// # Forget Password
const forget = async (req, res) => {
    const { email, password, pet } = req.body;

    let errors = {};

    if (email.trim() === "") {
        errors.email = "Email cannot be empty";
    }
    if (pet.trim() === "") {
        errors.pet = "Pet name cannot be empty";
    }
    if (password.trim() === "") {
        errors.password = "Password cannot be empty";
    }

    try {

        const user = await User.findOne({ email: email, pet: pet });

        const emailTest = await User.findOne({ email: email });

        if (user === null) {
            if (emailTest === null) {
                return res.status(400).json({ error: "User do not exist." });
            }
            else {
                return res.status(400).json({ error: "Wrong pet name." });
            }

        }
        const encodedPassword = await bcrypt.hash(password, 6);
        user.password = encodedPassword;
        const updatedUser = await user.save();
        return res.status(200).json(updatedUser);

    } catch (error) {
        return res.status(500).json({ error: "Something went wrong." });
    }

};

router.post("/register", register);
router.post("/login", login);
router.post("/forget", forget);
router.get("", getAllUsers);


module.exports = router;