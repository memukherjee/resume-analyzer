import { Router } from 'express';
import { scanResumes } from '../controller/recruiter';
import { uploadSingleZip } from '../middleware/fileUploader';

const router = Router();

router.post('/resume', uploadSingleZip, scanResumes);

export default router;
