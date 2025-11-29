import express from 'express';
import { getJobs, createJob } from '../controllers/jobController';
import { applyForJob, getApplications } from '../controllers/applicationController';

const router = express.Router();

router.route('/')
    .get(getJobs)
    .post(createJob);

router.post('/apply', applyForJob);
router.get('/:id/applications', getApplications);

export default router;
