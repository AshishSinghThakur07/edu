const express = require('express');
const router = express.Router();
const { getJobs, createJob } = require('../controllers/jobController');
const { applyForJob, getApplications } = require('../controllers/applicationController');

router.route('/')
    .get(getJobs)
    .post(createJob);

router.post('/apply', applyForJob);
router.get('/:id/applications', getApplications);

module.exports = router;
