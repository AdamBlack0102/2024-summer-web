const express = require('express');
const User = require('../database/models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', async (req,res) => {
    const {username, password} = req.body;
    console.log('Received data:', { username, password });
    if (!username || !password) {
        return res.status(400).json({ msg: 'Username and password are required' });
    }

    try {
        const user = await User.create({ username, password });
        res.status(201).json({ msg: 'User registered successfully', success: true });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ msg: 'Error registering user', success: false });
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Received login data:', { username, password });

    if (!username || !password) {
        return res.status(400).json({ msg: 'Username and password are required' });
    }

    try {
        const user = await User.findAll({
            where: {
                username: username,
                password: password
            }
        });

        if (user) {
            return res.redirect('http://localhost:63342/web02/front/src/pages/home.html');
        } else {
            return res.status(401).json({ msg: 'Invalid username or password', success: false });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ msg: 'Error logging in', success: false });
    }
});


router.post('/auth', async (req,res) => {
    const token = req.headers.authorization.split(' ').pop();
    if(!token)
        return res.send({msg: "No token"})
    const {username} = jwt.verify(token, 'hazel');
    const model = await User.findOne({
        where: {
            username: username
        }
    });
    if(!model)
        return res.send({msg: 'The username does not exist'})
    return res.send({msg: 'Login successful'})
})

module.exports = router;