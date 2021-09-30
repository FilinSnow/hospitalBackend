const express = require('express');
const { check } = require('express-validator');
const authMiddleWare = require('../../middleware/authMiddleWare');

const router = express.Router();

const {
    getAllRecords,
    createNewRecord,
    deleteRecord,
    updateInfoRecord
} = require('../controllers/hospital.controller');

const {
    registrationUser,
    loginUser
} = require('../controllers/users.controller');

router.get('/getAllRecords', authMiddleWare, getAllRecords);
router.post('/createNewRecord', authMiddleWare, createNewRecord);
router.put('/updateInfoRecord', authMiddleWare, updateInfoRecord);
router.delete('/deleteRecord/:id', authMiddleWare, deleteRecord);
router.post('/registration', [
    check('username', 'User name should not have empty').notEmpty(),
    check('password', 'Pass should be more then 6').isLength({ min: 6 }),
], registrationUser);
router.post('/login', loginUser);

module.exports = router;
