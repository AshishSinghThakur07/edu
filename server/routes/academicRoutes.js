const express = require('express');
const router = express.Router();
const { getCourses, createCourse } = require('../controllers/courseController');
const { getClasses, createClass } = require('../controllers/classController');

// Course Routes
router.route('/courses').get(getCourses).post(createCourse);

// Class Routes
router.route('/classes').get(getClasses).post(createClass);

module.exports = router;
