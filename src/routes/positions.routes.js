import {
    Router
} from 'express'

const router = Router();

import {
    getPositions
} from '../controllers/position.controller'

// EndPoint : /api/departments 
router.get('/', getPositions);

export default router;