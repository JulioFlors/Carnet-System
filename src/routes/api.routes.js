import {
    Router
} from 'express'

const router = Router();

import {
    isAuthenticated
} from '../helpers/auth'

// Routes -> API Rest -> Data Base 

///////////////////////////////////////////////////// rac.routes.js
import {
    getRac
} from '../controllers/api/rac.controller'

// EndPoint : /api/rac
router.get('/api/rac/', isAuthenticated, getRac);

// EndPoint : /api/rac/:id 
///////////////////////////////////////////////////// rac.routes.js



///////////////////////////////////////////////////// form.routes.js
import {
    getForm
} from '../controllers/api/form.controller'

// EndPoint : /api/form/:id 
router.get('/api/form/:id', isAuthenticated, getForm);
///////////////////////////////////////////////////// form.routes.js



///////////////////////////////////////////////////// Users.Routes.js
import {
    createUser,
    getUsers,
    updateUser,
    deleteUser
} from '../controllers/api/user.controller'

// EndPoint : /api/users
router.post('/api/users/', isAuthenticated, createUser);
router.get('/api/users/', isAuthenticated, getUsers);

// EndPoint : /api/users/:id
router.put('/api/users/:id', isAuthenticated, updateUser);
router.delete('/api/users/:id', isAuthenticated, deleteUser);
///////////////////////////////////////////////////// users.routes.js



///////////////////////////////////////////////////// staff.routes.js
import {
    getStaff
} from '../controllers/api/staff.controller'

// EndPoint : /api/staff 
router.get('/api/staff/', isAuthenticated, getStaff);

// EndPoint : /api/staff/:id 
///////////////////////////////////////////////////// staff.routes.js


///////////////////////////////////////////////////// photos.routes.js
import {
    uploadPhoto,
    getPhoto,
    deletePhoto
} from '../controllers/api/photo.controller'

// EndPoint : /api/photos 
router.post('/api/photos/upload', isAuthenticated, uploadPhoto);

// EndPoint : /api/photos/:id 
router.get('/api/photos/:id', isAuthenticated, getPhoto);
router.delete('/api/photos/:id', isAuthenticated, deletePhoto);
///////////////////////////////////////////////////// photos.routes.js



///////////////////////////////////////////////////// carnets.routes.js
import {
    getCarnets
} from '../controllers/api/carnet.controller'

// EndPoint : /api/carnets 
router.get('/api/carnets/', isAuthenticated, getCarnets);

// // EndPoint : /api/carnets/:id 
///////////////////////////////////////////////////// carnets.routes.js



///////////////////////////////////////////////////// positions.routes.js
import {
    getPositions
} from '../controllers/api/position.controller'

// EndPoint : /api/departments 
router.get('/api/positions/', isAuthenticated, getPositions);
///////////////////////////////////////////////////// positions.routes.js



///////////////////////////////////////////////////// departments.routes.js
import {
    getDepartments
} from '../controllers/api/department.controller'

// EndPoint : /api/departments 
router.get('/api/departmens/', isAuthenticated, getDepartments);
///////////////////////////////////////////////////// departments.routes.js



///////////////////////////////////////////////////// foreign_carnets.routes.js
import {
    getForeign_Carnets
} from '../controllers/api/foreign_carnet.controller'

// EndPoint : /api/foreign_carnets 
router.get('/api/foreign_carnets/', isAuthenticated, getForeign_Carnets);
///////////////////////////////////////////////////// foreign_carnets.routes.js



///////////////////////////////////////////////////// foreign_persons.routes.js
import {
    getForeign_Persons
} from '../controllers/api/foreign_person.controller'

// EndPoint : /api/foreign_persons 
router.get('/api/foreign_persons/', isAuthenticated, getForeign_Persons);

// EndPoint : /api/foreign_persons/:id 
///////////////////////////////////////////////////// foreign_persons.routes.js 



export default router;