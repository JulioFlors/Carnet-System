import {
    Router
} from 'express'

const router = Router();

import {
    getForm
} from '../controllers/form.controller'

// EndPoint : /api/form/:id 
router.get('/:id', getForm);

export default router;