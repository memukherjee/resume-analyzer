import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';
import unzipper from 'unzipper';

export const parsePdf = async (pdfPath: string) => {
    const filePath = path.resolve(__dirname, "../../"+pdfPath);
    const pdfData = fs.readFileSync(filePath);
    const data =  await pdfParse(pdfData)
    fs.unlinkSync(filePath);
    
    return data;
};

export const unZip = async (zipPath: string, destinationPath: string) =>{
    const filePath = path.resolve(__dirname, `../../${zipPath}`);
    const extractedPath = path.resolve(__dirname, `../../${destinationPath}`)
    const directory = await unzipper.Open.file(filePath);
    await directory.extract({ path: extractedPath })
    fs.unlinkSync(filePath);
    
}