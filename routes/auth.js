const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/users');

require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET

router.post('/auth/signup', async (req, res) => {
    const isEmailExist = await User.findOne({ email: req.body.email });
  
    if (isEmailExist) return res.status(400).json({ error: "email already exists" });
  
    const password = await bcrypt.hash(req.body.password, 10);
  
    const user = new User({
      name: req.body.name,
      role: req.body.role,
      email: req.body.email,
      password,
    });

    try {
        const savedUser = await user.save();
        const accessToken = jwt.sign({user_id: savedUser._id, role: savedUser.role}, JWT_SECRET, {expiresIn: '1800s'});
  
        res.status(201).json({ error: null, data: { accessToken } });
    } catch(err) {
        res.status(400).send({error: err})
    }
})

router.post('/auth/signin', async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email }).exec();
        if (!user) return res.status(400).json({ error: "user does not exist." });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({ error: "wrong user/password." });

        const accessToken = jwt.sign({user_id: user._id, role: user.role}, JWT_SECRET, {expiresIn: '1800s'});

        res.status(200).json({ error: null, data: { accessToken,} });

    } catch(err) {
        res.status(400).send({ error: err})
    }

})

module.exports = router