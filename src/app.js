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
        Capitalize: function (string) {
            return string
                .split(' ')
                .map(word => word.substr(0, 1).toUpperCase() + word.substr(1, word.length).toLowerCase())
                .join(' ');
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

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Routes -> API Rest -> EndPoint : /api/users -> EndPoint : /api/staff -> EndPoint : /api/form 
app.use('/', apiRoutes);

// Routes -> Frontend -> EndPoint : /api/users -> EndPoint : /api/staff -> EndPoint : /api/form 
app.use('/', staffRoutes);
app.use('/', indexRoutes);
app.use('/', sessionRoutes);

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

export default app;