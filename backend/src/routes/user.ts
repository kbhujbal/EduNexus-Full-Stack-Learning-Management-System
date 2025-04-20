import express from 'express';
import { auth } from '../middleware/auth';
import { getProfile, updateProfile, changePassword } from '../controllers/user';

const router = express.Router();

// All routes are protected
router.use(auth);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/password', changePassword);

export default router; 