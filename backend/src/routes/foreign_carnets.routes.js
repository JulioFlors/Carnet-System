import {
    Router
} from 'express'

const router = Router();

import {
    getForeign_Carnets
} from '../controllers/foreign_carnet.controller'


// EndPoint : /api/foreign_carnets 
router.get('/', getForeign_Carnets);

export default router;