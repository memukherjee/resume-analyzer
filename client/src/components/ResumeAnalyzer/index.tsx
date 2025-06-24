import { useState } from 'react';
import axios from 'axios';
import ResumeScoreDashboard from './ResumeScoreDashboard';
import { HashLoader } from 'react-spinners';
import { Status } from '../../types/constants';
import TextArea from '../TextArea';
import ResumeInputTaker from '../ResumeInputTaker';

export default function ResumeAnalyzer() {
    const [currentStatus, setCurrentStatus] = useState<Status>(Status.EMPTY);
    const [jobDescription, setJobDescription] = useState<string>('');
    const [resumeFile, setResumeFile] = useState<File>();
    const [analyzedResumeData, setAnalyzedResumeData] = useState<ResumeScore>({
        score: 0,
        keyPoints: [],
        improvements: []
    });

    function uploadFile(file: File, jobDescription: string) {
        if (jobDescription.length > 0) {
            setCurrentStatus(Status.UPLOADING);
            console.log('uploading...');
            console.log(file);
            const data = new FormData();
            data.append('file', file);
            data.append('jd', jobDescription);
            axios
                .post(`${import.meta.env.VITE_SERVER_API}/api/resume`, data, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                })
                .then((response) => {
                    console.log(response.data);
                    setAnalyzedResumeData(response.data.data);
                    setCurrentStatus(Status.COMPLETED);
                })
                .catch((error) => {
                    console.error(error);
                    setCurrentStatus(Status.FAILED);
                });
        }
    }

    return (
        <>
            <div className="grid place-items-center w-full h-[calc(100dvh-5em)]">
                {!!(currentStatus === Status.EMPTY || currentStatus === Status.FAILED) && (
                    <TextArea
                        style={
                            currentStatus === Status.FAILED
                                ? {
                                      color: 'red',
                                      borderColor: 'red'
                                  }
                                : {
                                      color: '#000'
                                  }
                        }
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Job Description"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && resumeFile)
                                uploadFile(resumeFile, jobDescription);
                        }}
                        name="job-description"
                    />
                )}
                {currentStatus === Status.EMPTY || currentStatus === Status.FAILED ? (
                    <ResumeInputTaker
                        currentStatus={currentStatus}
                        uploadFile={uploadFile}
                        file={resumeFile}
                        setFile={setResumeFile}
                        fileType="application/pdf"
                        jobDescription={jobDescription}
                    />
                ) : currentStatus === Status.UPLOADING ? (
                    <HashLoader color="#aaa" size={100} />
                ) : (
                    <ResumeScoreDashboard analyzedResumeData={analyzedResumeData} />
                )}
            </div>
        </>
    );
}
