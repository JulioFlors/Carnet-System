import {
    Router
} from 'express'
const router = Router();

import {
    getRac
} from '../controllers/rac.controller'

// EndPoint : /api/rac
router.get('/', getRac);

// EndPoint : /api/rac/:id 

export default router;