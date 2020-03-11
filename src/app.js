import express, {
    json
} from 'express'

import morgan from 'morgan'

import exphbs from 'express-handlebars'

// Modules para Multer
import multer from 'multer'
import path from 'path'
import {
    v4 as uuidv4
} from 'uuid';

// Environment Variables
require('dotenv').config();

// Importing Routes
import apiRoutes from './routes/api.routes'
import apiRoutes from './routes/api.routes'

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
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


// Routes -> API Rest -> EndPoint : /api/users -> EndPoint : /api/staff -> EndPoint : /api/form 
app.use('/', apiRoutes);

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

export default app;