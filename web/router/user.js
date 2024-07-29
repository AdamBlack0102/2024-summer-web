const express = require('express');
const User = require('../database/models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', async (req,res) => {
    const {username, password} = req.body;
    const model = await User.findOne({
        where: {
            username: username
        }
    });
    if(model)
        return res.send({msg: 'The username already exists'})
    const user = await User.create({username, password: bcrypt.hashSync(password, 3)});
    res.send({msg:"Registered successfully"})
})

router.post('/login', async (req,res) => {
    const {username, password} = req.body;
    const model = await User.findOne({
        where: {
            username: username
        }
    });
    if(!model)
        return res.send({msg: 'The username does not exist, please register'})
    const passwordValid = bcrypt.compareSync(password, model.dataValues.password);
    if(!passwordValid)
        return res.send({msg: "Wrong password"})

    const token = jwt.sign({username}, 'hazel')
    res.send({token})
})

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