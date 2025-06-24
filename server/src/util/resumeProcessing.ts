import { NextFunction } from 'express';
import { getResponseFromAi } from './callAi';

export async function analyzeResumeData(
    resumeData: string,
    jd: string,
    next: NextFunction,
) {
    const prompt = `
    You are an expert resume reviewer. Here is a resume:
    -------------------------------
    ${resumeData}
    -------------------------------

    Here is a job description:
    -------------------------------
    ${jd}
    -------------------------------

    Evaluate the resume:
    - Skill match
    - Missing experience
    - Writing tone/structure
    - Suggestions for improvement
    
    Response format in JSON: 
    {
        "score": number, // Score the resume for the Job Description out of 100, The Score need to be based on how good the resume is and give score conservativly
        "keyPoints": string[]; // key points to note about the resume
        "improvements": string[]; // improvements that can be done in the resume
    }
    `;

    const response = await getResponseFromAi(prompt, next);
    if(response){
        const resJson: ResumeScore = JSON.parse(response);
        return resJson
    }
    return null;
}


export async function screenResume(
    resumeData: string,
    jd: string,
    next: NextFunction,
) {
    const prompt = `
    You are an expert resume reviewer. Here is a resume:
    -------------------------------
    ${resumeData}
    -------------------------------

    Here is a job description:
    -------------------------------
    ${jd}
    -------------------------------

    Evaluate the resume:
    - Skill match
    - Experience
    - Writing tone/structure
    
    Response format in JSON: 
    {
        "name" : string, // Name of the applicant
        "score": number, // Score the resume for the Job Description out of 100, The Score need to be based on how good the resume is and give score conservativly
    }
    `;

    const response = await getResponseFromAi(prompt, next);
    if(response){
        const resJson: Resume['result'] = JSON.parse(response);
        return resJson
    }
    return null;
}