import {
    Router
} from 'express'

const router = Router();

import {
    isAuthenticated
} from '../helpers/auth'

import {
    getAllStaff
} from '../controllers/staff.controller'

// EndPoint : / 
router.get('/Staff', isAuthenticated, getAllStaff);

// EndPoint : /api/rac/:id 

export default router