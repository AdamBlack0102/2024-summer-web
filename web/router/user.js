const express = require('express');
const User = require('../database/models/User');
const bcrypt = require('bcryptjs')

const router = express.Router();

router.post('/register', async (req,res) => {
    const {username, password} = req.body;
    const model = await User.findOne({where: {username}})
    if(model)
        return res.send({msg: '用户名已存在'})
    const user = await User.create({username, password: bcrypt.hashSync(password, 3)});
    console.log(user.dataValues);
})

module.exports = router;