import { Request, Response } from 'express';
import Course from '../models/Course';
import User from '../models/User';

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find()
      .populate('adminId', 'firstName lastName email')
      .populate('teachingAssistants', 'firstName lastName email');
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('adminId', 'firstName lastName email')
      .populate('teachingAssistants', 'firstName lastName email')
      .populate('enrolledStudents', 'firstName lastName email');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, modules } = req.body;
    const userId = (req as any).user.userId;

    const course = new Course({
      title,
      description,
      adminId: userId,
      modules,
    });

    await course.save();

    // Update user's managed courses
    await User.findByIdAndUpdate(userId, {
      $push: { managedCourses: course._id },
    });

    res.status(201).json(course);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if user is admin or teaching assistant
    const userId = (req as any).user.userId;
    if (!course.adminId.equals(userId) && !course.teachingAssistants.includes(userId)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(updatedCourse);
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if user is admin
    const userId = (req as any).user.userId;
    if (!course.adminId.equals(userId)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await course.remove();

    // Remove course from users' managed courses
    await User.updateMany(
      { managedCourses: course._id },
      { $pull: { managedCourses: course._id } }
    );

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const enrollInCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);
    const userId = (req as any).user.userId;

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if user is already enrolled
    if (course.enrolledStudents.includes(userId)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Add user to enrolled students
    course.enrolledStudents.push(userId);
    await course.save();

    // Add course to user's enrolled courses
    await User.findByIdAndUpdate(userId, {
      $push: { enrolledCourses: course._id },
    });

    res.json({ message: 'Successfully enrolled in course' });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 