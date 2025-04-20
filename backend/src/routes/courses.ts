import express from 'express';
import { auth } from '../middleware/auth';

const router = express.Router();

// TODO: Implement course routes
router.get('/', auth, (req, res) => {
  res.json({ message: 'Courses route' });
});

export default router; 