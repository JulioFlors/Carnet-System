import {
    Router
} from 'express'

const router = Router();

// Routes -> API Rest -> Data Base 

///////////////////////////////////////////////////// rac.routes.js
import {
    getRac
} from '../controllers/api/rac.controller'

// EndPoint : /api/rac
router.get('/api/rac/', getRac);

// EndPoint : /api/rac/:id 
///////////////////////////////////////////////////// rac.routes.js



///////////////////////////////////////////////////// form.routes.js
import {
    getForm
} from '../controllers/api/form.controller'

// EndPoint : /api/form/:id 
router.get('/api/form/:id', getForm);
///////////////////////////////////////////////////// form.routes.js



///////////////////////////////////////////////////// Users.Routes.js
import {
    createUser,
    getUsers,
    updateUser,
    deleteUser
} from '../controllers/api/user.controller'

// EndPoint : /api/users
router.post('/api/users/', createUser);
router.get('/api/users/', getUsers);

// EndPoint : /api/users/:id
router.put('/api/users/:id', updateUser);
router.delete('/api/users/:id', deleteUser);
///////////////////////////////////////////////////// users.routes.js



///////////////////////////////////////////////////// staff.routes.js
import {
    getStaff
} from '../controllers/api/staff.controller'

// EndPoint : /api/staff 
router.get('/api/staff/', getStaff);

// EndPoint : /api/staff/:id 
///////////////////////////////////////////////////// staff.routes.js


///////////////////////////////////////////////////// photos.routes.js
import {
    uploadPhoto,
    getPhoto,
    deletePhoto
} from '../controllers/api/photo.controller'

// EndPoint : /api/photos 
router.post('/api/photos/upload', uploadPhoto);

// EndPoint : /api/photos/:id 
router.get('/api/photos/:id', getPhoto);
router.delete('/api/photos/:id', deletePhoto);
///////////////////////////////////////////////////// photos.routes.js



///////////////////////////////////////////////////// carnets.routes.js
import {
    getCarnets
} from '../controllers/api/carnet.controller'

// EndPoint : /api/carnets 
router.get('/api/carnets/', getCarnets);

// // EndPoint : /api/carnets/:id 
///////////////////////////////////////////////////// carnets.routes.js



///////////////////////////////////////////////////// positions.routes.js
import {
    getPositions
} from '../controllers/api/position.controller'

// EndPoint : /api/departments 
router.get('/api/positions/', getPositions);
///////////////////////////////////////////////////// positions.routes.js



///////////////////////////////////////////////////// departments.routes.js
import {
    getDepartments
} from '../controllers/api/department.controller'

// EndPoint : /api/departments 
router.get('/api/departmens/', getDepartments);
///////////////////////////////////////////////////// departments.routes.js



///////////////////////////////////////////////////// foreign_carnets.routes.js
import {
    getForeign_Carnets
} from '../controllers/api/foreign_carnet.controller'

// EndPoint : /api/foreign_carnets 
router.get('/api/foreign_carnets/', getForeign_Carnets);
///////////////////////////////////////////////////// foreign_carnets.routes.js



///////////////////////////////////////////////////// foreign_persons.routes.js
import {
    getForeign_Persons
} from '../controllers/api/foreign_person.controller'

// EndPoint : /api/foreign_persons 
router.get('/api/foreign_persons/', getForeign_Persons);

// EndPoint : /api/foreign_persons/:id 
///////////////////////////////////////////////////// foreign_persons.routes.js 



export default router;