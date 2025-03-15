
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';
import { sendMail } from '../utils/sendMail.js';
import { LoginTemplate, WelcomeTemplate } from '../templates/Welcome.js';
import User from '../models/userModel.js';


export const signupController = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const profilePicture = req.files?.profilePicture; 
console.log(req.body)
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        // Hash password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Upload profile picture
        let profilePictureUrl = null;
        if (profilePicture) {
            try {
                profilePictureUrl = await uploadToCloudinary(profilePicture.tempFilePath);
            } catch (cloudinaryError) {
                return res.status(400).json({ message: 'Error uploading profile picture' });
            }
        }

        // Create new user
        const newUser = new User({
            fullName: { firstName, lastName },
            email,
            password: hashedPassword,
            profilePicture: profilePictureUrl
        });

        const savedUser = await newUser.save();
        if (!savedUser) {
            return res.status(400).json({ message: 'Something went wrong in signup' });
        }

        // Generate token
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        console.log("Sending welcome email to:", savedUser.email);

       
        const info = await sendMail({
            to: savedUser.email,
            subject: "Welcome To DEMO INC.",
            html: WelcomeTemplate, 
        });

        if (!info.accepted.includes(savedUser.email)) {
            return res.status(400).json({ message: 'Failed to send welcome email' });
        }

        return res.status(201).json({ user: savedUser, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong in signup' });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000,
        });
        const info = await sendMail({
            to: user.email,
            subject: "Welcome Back",
            html: LoginTemplate(user.fullName.firstName), // Ensure `WelcomeTemplate` is defined before using it
        });

        if (!info.accepted.includes(user.email)) {
            return res.status(400).json({ message: 'Failed to send welcome email' });
        }

        return res.status(200).json({ user, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong in login' });
    }
}
export const logoutController = async (req,res) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(400).json({ message: 'User not logged in' });
        }
        res.clearCookie('token');
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong in logout' });
        
    }
}