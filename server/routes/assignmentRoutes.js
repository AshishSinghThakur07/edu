const express = require('express');
const router = express.Router();
const { getAssignments, createAssignment } = require('../controllers/assignmentController');
const { submitAssignment, getSubmissions } = require('../controllers/submissionController');

router.route('/')
    .get(getAssignments)
    .post(createAssignment);

router.post('/submit', submitAssignment);
router.get('/:id/submissions', getSubmissions);

module.exports = router;
