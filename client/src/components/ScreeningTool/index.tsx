import { useState } from 'react';
import TextArea from '../TextArea';
import { Status } from '../../types/constants';
import axios from 'axios';
import { HashLoader } from 'react-spinners';
import SuccessComponent from './SuccessComponent';
import ResumeInputTaker from '../ResumeInputTaker';

export default function ScreeningTool() {
    const [jobDescription, setJobDescription] = useState<string>('');
    const [currentStatus, setCurrentStatus] = useState<Status>(Status.EMPTY);
    const [resumesZip, setResumesZip] = useState<File>();
    const [resumesData, setResumesData] = useState<Array<Resume>>();
    function uploadFile(file: File, jobDescription: string) {
        if (jobDescription.length > 0) {
            setCurrentStatus(Status.UPLOADING);
            console.log('uploading...');
            console.log(file);
            const data = new FormData();
            data.append('file', file);
            data.append('jd', jobDescription);
            axios
                .post(`${import.meta.env.VITE_SERVER_API}/api/recruiter/resume`, data, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                })
                .then((response) => {
                    console.log(response);
                    setResumesData(response.data.data);
                    setCurrentStatus(Status.COMPLETED);
                })
                .catch((error) => {
                    console.error(error);
                    setCurrentStatus(Status.FAILED);
                });
        }
    }

    return (
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
                        if (e.key === 'Enter' && resumesZip) uploadFile(resumesZip, jobDescription);
                    }}
                    name="job-description"
                />
            )}
            {currentStatus === Status.EMPTY || currentStatus === Status.FAILED ? (
                <ResumeInputTaker
                    currentStatus={currentStatus}
                    uploadFile={uploadFile}
                    file={resumesZip}
                    setFile={setResumesZip}
                    fileType="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
                    jobDescription={jobDescription}
                />
            ) : currentStatus === Status.UPLOADING ? (
                <HashLoader color="#aaa" size={100} />
            ) : (
                !!resumesData && <SuccessComponent resumesData={resumesData} />
            )}
        </div>
    );
}
