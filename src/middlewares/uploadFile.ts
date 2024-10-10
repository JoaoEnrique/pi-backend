import multer, { StorageEngine } from 'multer';
import { Request, Response } from 'express';

const storage: StorageEngine = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: Function) => {
        cb(null, './uploads'); // Diretório onde os arquivos serão armazenados
    },
    filename: (req: Request, file: Express.Multer.File, cb: Function) => {
        cb(null, file.originalname); // Nome original do arquivo
    }
});

const uploadFile = multer({ storage });

export default uploadFile;
