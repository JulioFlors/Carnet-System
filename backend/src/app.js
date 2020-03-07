import express, {
    json
} from 'express'

import morgan from 'morgan'

// Importing Routes
import ractRoutes from './routes/rac'
import formRoutes from './routes/form'
import userRoutes from './routes/users'
import staffRoutes from './routes/staff'
import carnetRoutes from './routes/carnets'
import positionRoutes from './routes/positions'
import departmenRoutes from './routes/departments'
import foreign_CarnetRoutes from './routes/foreign_carnets'
import foreign_personRoutes from './routes/foreign_persons'

// Initialization
const app = express();

// settings
app.set('port', 4000);
app.set('json spaces', 4);

// Middlewares
app.use(morgan('dev'));
app.use(json());

// Routes
app.use('/api/rac', ractRoutes);
app.use('/api/form', formRoutes);
app.use('/api/users', userRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/carnets', carnetRoutes);
app.use('/api/positions', positionRoutes);
app.use('/api/departmens', departmenRoutes);
app.use('/api/foreign_carnets', foreign_CarnetRoutes);
app.use('/api/foreign_persons', foreign_personRoutes);

export default app;