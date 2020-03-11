import {
    Router
} from 'express'

const router = Router();

import {
    getStaff
} from '../controllers/staff.controller'

// EndPoint : /api/staff 
router.get('/', getStaff);

// EndPoint : /api/staff/:id 

export default router;