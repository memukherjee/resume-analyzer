import { Router } from 'express';
import resumeRoute from './resume';
import recruiterRoute from './recruiter'

const router = Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Hi',
    });
});

router.use('/resume', resumeRoute);
router.use('/recruiter', recruiterRoute);

export default router;
