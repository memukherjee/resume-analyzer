import { Router } from 'express';
import { analyzeResume } from '../controller/resume';
import { uploadSinglePdf } from '../middleware/fileUploader';

const router = Router();

router.post('/', uploadSinglePdf, analyzeResume);

export default router;
