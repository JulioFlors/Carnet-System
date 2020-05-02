import express, {
    json
} from 'express'

import morgan from 'morgan'

import exphbs from 'express-handlebars'

import flash from 'connect-flash'

import session from 'express-session'

import passport from 'passport'

import methodOverride from 'method-override'

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
import staffRoutes from './routes/staff.routes'
import indexRoutes from './routes/index.routes'
import carnetRoutes from './routes/carnet.routes'
import sessionRoutes from './routes/session.routes'


// Initializations
const app = express();
import './config/passport'

// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

// Settings Handlebars
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',

    helpers: {
        capitalize: function (string) {
            return string
                .split(' ')
                .map(word => word.substr(0, 1).toUpperCase() + word.substr(1, word.length).toLowerCase())
                .join(' ');
        },

        // hace referencia a que un empleado posee o no carnet
        haveCarnet: function (variable) {
            if (variable) return 'Listo';

            if (!variable) return 'No';
        },

        isAdmin: function (user) {
            if (user === 'Admin') return true;
            return false;
        }
    }
}));

// Settings
app.set('view engine', '.hbs');
app.set('json spaces', 4);

// Middlewares
app.use(express.urlencoded({
    extended: false
}));
app.use(methodOverride('_method'));
// app.use(morgan('dev'));
app.use(json());
app.use(flash());

// Middlewares para Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

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
    limits: {
        fileSize: 10000000
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|JPEG|jpg|JPG|png|PNG|gif|GIF/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Archivo de imagen no valido');
        }
    }
}).single('photo'));

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    res.locals.filename = req.filename || null;
    next();
});

// Routes -> API Rest -> EndPoint : /api/users -> EndPoint : /api/staff -> EndPoint : /api/form 
app.use('/', apiRoutes);

// Routes -> Frontend -> EndPoint : /api/users -> EndPoint : /api/staff -> EndPoint : /api/form 
app.use('/', staffRoutes);
app.use('/', indexRoutes);
app.use('/', carnetRoutes);
app.use('/', sessionRoutes);

// Static Files
app.use(express.static(path.join(__dirname, '/public')));

export default app;