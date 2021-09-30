const User = require('../../db/models/users/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator');
const { secret } = require('../../config/config');

module.exports.registrationUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Error registration', errors })
        }
        const { username, password } = req.body;
        const candidate = await User.findOne({ username });
        if (candidate) {
            return res.status(400).json({ message: 'User with this login exists' })
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        const user = new User({ username, password: hashPassword, });
        await user.save();
        const findUser = await User.findOne({ username });
        const token = generateAccessToken(findUser._id);
        return res.json({
            token,
            user: {
                id: user.id,
                userName: findUser.username
            }
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Registration error' })
    }
}

const generateAccessToken = (id) => {
    const payload = {
        id,
    }
    return jwt.sign(payload, secret, { expiresIn: '24h' });
}

module.exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send({ message: `User ${username} not found` })
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).send({ message: `Wrong password` })
        }
        const token = generateAccessToken(user._id);
        return res.json({
            token,
            user: {
                id: user.id,
                userName: user.username
            }
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Login error' })
    }
}
