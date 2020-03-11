import express, {
    json
} from 'express'

import morgan from 'morgan'

// Environment Variables
require('dotenv').config();

// Modules para Multer
import multer from 'multer'
import path from 'path'
import {
    v4 as uuidv4
} from 'uuid';

// Importing Routes
import racRoutes from './routes/rac.routes'
import formRoutes from './routes/form.routes'
import userRoutes from './routes/users.routes'
import staffRoutes from './routes/staff.routes'
import photoRoutes from './routes/photos.routes'
import carnetRoutes from './routes/carnets.routes'
import positionRoutes from './routes/positions.routes'
import departmenRoutes from './routes/departments.routes'
import foreign_CarnetRoutes from './routes/foreign_carnets.routes'
import foreign_personRoutes from './routes/foreign_persons.routes'

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('json spaces', 4);

// Middlewares
app.use(express.urlencoded({
    extended: false
}));
app.use(morgan('dev'));
app.use(json());

// Middlewares para Multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

// Middlewares para Multer
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

// Routes
app.use('/api/rac', racRoutes);
app.use('/api/form', formRoutes);
app.use('/api/users', userRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/carnets', carnetRoutes);
app.use('/api/positions', positionRoutes);
app.use('/api/departmens', departmenRoutes);
app.use('/api/foreign_carnets', foreign_CarnetRoutes);
app.use('/api/foreign_persons', foreign_personRoutes);

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

export default app;