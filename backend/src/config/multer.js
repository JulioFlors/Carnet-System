import multer from 'multer'
import 'path'
import {
    v4 as uuidv4
} from 'uuid';

// Middlewares
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'backend/public/img/uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

// Middlewares
app.use(multer({
    storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Archivo de imagen no valido');
        }
    }
}).single('image'));