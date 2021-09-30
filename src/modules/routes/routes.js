const express = require('express');
const { check } = require('express-validator');
const authMiddleWare = require('../../middleWare/authMiddleWare');

const router = express.Router();

const {
    registrationUser,
} = require('../controllers/users.controller');



router.post('/registration', [
    check('username', 'User name should not have empty').notEmpty(),
    check('password', 'Pass should be more then 6').isLength({ min: 6 }),
], registrationUser);