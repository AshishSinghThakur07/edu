import express from 'express';
import { getAssignments, createAssignment } from '../controllers/assignmentController';
import { submitAssignment, getSubmissions } from '../controllers/submissionController';

const router = express.Router();

router.route('/')
    .get(getAssignments)
    .post(createAssignment);

router.post('/submit', submitAssignment);
router.get('/:id/submissions', getSubmissions);

export default router;
