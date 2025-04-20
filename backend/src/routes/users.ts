import express from 'express';
import { auth } from '../middleware/auth';

const router = express.Router();

// TODO: Implement user routes
router.get('/profile', auth, (req, res) => {
  res.json({ message: 'User profile route' });
});

export default router; 