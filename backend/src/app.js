import express, {
    json
} from 'express'

import morgan from 'morgan'

// Importing Routes
import ractRoutes from './routes/rac.routes'
import formRoutes from './routes/form.routes'
import userRoutes from './routes/users.routes'
import staffRoutes from './routes/staff.routes'
// import photoRoutes from './routes/photos.routes'
import carnetRoutes from './routes/carnets.routes'
import positionRoutes from './routes/positions.routes'
import departmenRoutes from './routes/departments.routes'
import foreign_CarnetRoutes from './routes/foreign_carnets.routes'
import foreign_personRoutes from './routes/foreign_persons.routes'

// Initializations
const app = express();
// import './config/multer'

// Settings
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
// app.use('/api/photos', photoRoutes);
app.use('/api/carnets', carnetRoutes);
app.use('/api/positions', positionRoutes);
app.use('/api/departmens', departmenRoutes);
app.use('/api/foreign_carnets', foreign_CarnetRoutes);
app.use('/api/foreign_persons', foreign_personRoutes);

// Static Files
// app.use(express.static(path.join(__dirname, 'backend/public')));

export default app;