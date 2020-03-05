import express, {
    json
} from 'express'
import morgan from 'morgan'

// Importing Routes
import userRoutes from './routes/users';
// import carnetRoutes from './routes/carnets'; 

// Initialization
const app = express();

// settings
app.set('port', 4000);
app.set('json spaces', 4);

// Middlewares
app.use(morgan('dev'));
app.use(json());

// Routes
app.use('/api/users', userRoutes);
// app.use('/api/carnets', carnetRoutes); 

export default app;