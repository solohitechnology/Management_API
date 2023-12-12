const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const UserModel = require('../models/Users'); 
const jwt = require('jsonwebtoken');


const router = express.Router();

router.post(
  '/register',
  [
    body('email').isEmail(),
    body('username').isAlphanumeric().trim(),
    body('password').isLength({ min: 6 }),
  ],
  async (req, res) => {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userData = req.body;
    const saltRounds = 10;

    try {
      const existingUser = await UserModel.findOne({
        $or: [{ email: userData.email }, { username: userData.username }],
      });

      if (existingUser) {
        return res.status(400).json({ message: 'Your Email or username already in use' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

      // Create and save user
      const user = new UserModel({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        username: userData.username,
        city: userData.city,
        address: userData.address,
        state: userData.state,
        password: hashedPassword,
      });

      await user.save();

      console.log('User data saved to MongoDB:', user);

      res.json({ message: 'Registration successful', user: user });
    } catch (error) {
      console.error('Error hashing password or saving to MongoDB:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);






router.post(
    '/login',
    [
      body('email').isEmail(),
      body('password').isLength({ min: 6 }),
    ],
    async (req, res) => {
      // Validate inputs
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {

        const user = await UserModel.findOne({ email });
  
        if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
  
        const passwordMatch = await bcrypt.compare(password, user.password);
  
        if (!passwordMatch) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
  
        const accessToken = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.JWT_KEY,
          { expiresIn: '1h' } 
        );
  
        //  refresh token 
        const refreshToken = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.REFRESH_TOKEN_KEY,
          { expiresIn: '7d' } 
        );
  
        res.json({ message: 'Login successful', accessToken, refreshToken, user: user });
      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  );
  

  



module.exports = router;
