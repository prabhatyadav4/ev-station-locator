import express from 'express';
import { registerUser, authUser, refreshToken } from '../controllers/authController.js';
import { body } from 'express-validator';

const router = express.Router();

const validateSignup = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

router.post('/signup', validateSignup, registerUser);
router.post('/login', authUser);
router.post('/refresh', refreshToken);

export default router;
