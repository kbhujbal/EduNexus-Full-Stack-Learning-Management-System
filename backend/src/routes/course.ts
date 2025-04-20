import express from 'express';
import { auth, checkRole } from '../middleware/auth';
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollInCourse,
} from '../controllers/course';

const router = express.Router();

// Public routes
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

// Protected routes
router.post('/', auth, checkRole(['instructor', 'admin']), createCourse);
router.put('/:id', auth, checkRole(['instructor', 'admin']), updateCourse);
router.delete('/:id', auth, checkRole(['admin']), deleteCourse);
router.post('/:id/enroll', auth, checkRole(['student']), enrollInCourse);

export default router; 