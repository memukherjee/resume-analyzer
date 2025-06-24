import multer from 'multer';

const uploadPdf = multer({
    dest: 'temp/',
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type') as AppError);
        }
    },
});

const uploadZip = multer({
    dest: 'temp/',
    limits: { fileSize: 5000000 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/zip') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type') as AppError);
        }
    },
});

export const uploadSinglePdf = uploadPdf.single('file');
export const uploadSingleZip = uploadZip.single('file')

