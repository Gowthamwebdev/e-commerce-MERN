import multer from 'multer';
import {v4 as uuid} from "uuid";

const storage= multer.diskStorage({
    destination(req, file, cb){
        cb(null, "./uploads");
    },

    filename(req, file, cb){
        const id = uuid();
        const extension = file.originalName.split(".").pop();
        const filename = `${id}.${extension}`;
        cb(null, filename);
    }

    // limits: { fileSize: 1000000 } // 1MB
});

export const uploadFiles = multer({storage}).single("image");