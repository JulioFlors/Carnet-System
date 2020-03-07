import {
    Router
} from 'express'

const router = Router();

import {
    getForeign_Persons
} from '../controllers/foreign_person.controller'

// EndPoint : /api/foreign_persons 
router.get('/', getForeign_Persons);

// EndPoint : /api/foreign_persons/:id 

export default router;