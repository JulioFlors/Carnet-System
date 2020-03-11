import {
    Router
} from 'express'

const router = Router();

import {
    getDepartments
} from '../controllers/department.controller'

// EndPoint : /api/departments 
router.get('/', getDepartments);

export default router;