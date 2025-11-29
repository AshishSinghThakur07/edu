import express from 'express';
import { getCourses, createCourse } from '../controllers/courseController';
import { getClasses, createClass } from '../controllers/classController';

const router = express.Router();

// Course Routes
router.route('/courses').get(getCourses).post(createCourse);

// Class Routes
router.route('/classes').get(getClasses).post(createClass);

export default router;
