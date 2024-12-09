const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "winners_institute";

// Signup controller=============================================================================>
exports.signup = async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const newUser = new User({ firstName, lastName, username, email, password });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id, username: newUser.username }, JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({
            message: "User registered successfully",
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Login controller=============================================================================>
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({
            message: `Welcome ${user.firstName}`,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
