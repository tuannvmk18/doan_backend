import { extname } from 'path';
import { diskStorage } from 'multer';

export const FileUploadDiskStorage = diskStorage({
  destination: './upload/',
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${extname(file.originalname)}`);
  },
});
