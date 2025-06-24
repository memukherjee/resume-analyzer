import { NextFunction, Request, Response } from 'express';
import { parsePdf } from '../util/fileUtility';
import { analyzeResumeData } from '../util/resumeProcessing';

export const analyzeResume = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const pdfFile = req.file;
    const { jd } = req.body;

    if (!pdfFile) {
        res.status(400).json({
            message: 'file is missing',
        });
        return;
    }
    const pdfData = await parsePdf(pdfFile.path);
    const responseData = await analyzeResumeData(pdfData.text, jd, next);
    res.status(200).json({
        message: 'hiiii',
        data: responseData,
    });
};
