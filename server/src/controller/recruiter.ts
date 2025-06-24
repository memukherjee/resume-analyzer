import { NextFunction, Request, Response } from 'express';
import { parsePdf, unZip } from '../util/fileUtility';
import fs from 'fs';
import { screenResume } from '../util/resumeProcessing';
import { ResumeStatus } from '../types/constants';
import path from 'path';

export const scanResumes = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const zipFile = req.file;
    const { jd } = req.body;
    if (!zipFile) {
        res.status(400).json({
            message: 'file is missing',
        });
        return;
    }
    const extractedFolder = `./temp/${zipFile.originalname.replace('.zip', '')}/`;
    await unZip(zipFile.path, extractedFolder);
    const resumes: Array<Resume> = [];

    const files = fs.readdirSync(extractedFolder);
    for (const file of files) {
        if (file.startsWith('__')) continue;
        const pdfPath = extractedFolder + file;
        const pdfData = await parsePdf(pdfPath);
        const responseData = await screenResume(pdfData.text, jd, next);
        if (responseData) {
            resumes.push({
                fileName: file,
                result: responseData,
                status:
                    responseData.score >=
                    parseInt(process.env.QUALIFYING_SCORE ?? '80')
                        ? ResumeStatus.ACCEPTED
                        : ResumeStatus.REJECTED,
            });
        } else {
            resumes.push({
                fileName: file,
                result: null,
                status: ResumeStatus.FAILED_TO_PROCESS,
            });
        }
    }
    fs.rmSync(path.resolve(__dirname, `../../${extractedFolder}`), {
        recursive: true,
        force: true,
    });
    res.status(200).json({
        message: 'screened the resumes',
        data: resumes,
    });
};
