const express = require('express');


const userController = require('../controller/userController')

const protect = require('../middleware/authMiddleware')

const admin = require('../middleware/adminMiddleware')

const router = express.Router();

router.post('/', userController.registerUser)
router.get('/', protect, admin, userController.getUsers)
router.post('/login', userController.authUser);
router.get('/profile', protect, userController.getUserProfile);
router.put('/profile', protect, userController.updateUserProfile)
router.delete('/:id', protect, admin, userController.deleteUser)
router.get('/:id', protect, admin, userController.getUserById)
router.put('/:id', protect, admin, userController.updateUser)


module.exports = router;