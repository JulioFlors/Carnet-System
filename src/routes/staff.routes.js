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

// Get All Staff
router.get('/', isAuthenticated, getAllStaff);

export default router