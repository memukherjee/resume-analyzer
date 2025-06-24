import { useRef, type DragEvent } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import { Status } from '../../types/constants';

type PropsType = {
    currentStatus: Status.EMPTY | Status.FAILED;
    uploadFile: (file: File, jobDescription: string) => void;
    file: File | undefined;
    setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
    fileType:string;
    jobDescription: string;
};

export default function ResumeInputTaker({
    currentStatus,
    uploadFile,
    file,
    setFile,
    fileType,
    jobDescription
}: PropsType) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    function handleFile() {
        const files = fileInputRef.current?.files;
        console.log(files);
        if (files && files.length > 0) {
            setFile(files[0]);
            uploadFile(files[0], jobDescription);
        }
    }

    function onDrop(e: DragEvent<HTMLLabelElement>) {
        e.preventDefault();
        console.log('Dropping...');
        const files = e.dataTransfer?.files;
        if (files && fileInputRef.current) {
            fileInputRef.current.files = files;
            handleFile();
        }
    }

    return (
        <label
            onDrop={(e) => onDrop(e)}
            onDragOver={(e) => {
                console.log('drag over');
                e.preventDefault();
            }}
            htmlFor="file-upload"
            style={
                currentStatus === Status.FAILED
                    ? {
                          color: 'red'
                      }
                    : {
                          color: '#aaa'
                      }
            }
            className="upload-block grid place-items-center border border-dashed text-center w-2/3 h-2/3 p-2 sm:p-20">
            <input
                ref={fileInputRef}
                onChange={handleFile}
                type="file"
                accept={fileType}
                name="file-upload"
                id="file-upload"
                hidden
            />
            <span className="mb-2">
                {file ? file.name : 'Drag and Drop File or Click to Upload'}
            </span>
            <FiUploadCloud
                style={
                    currentStatus === Status.FAILED
                        ? {
                              color: 'red'
                          }
                        : {}
                }
                className="text-primary text-9xl border-4 border-current rounded-full xl:w-1/2 xl:h-1/2 p-8"
            />
        </label>
    );
}
