import express from 'express';
const router = express.Router();
import { register, login,logout } from '../constroller/auth.controller';

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;