import {
    Router
} from 'express'

const router = Router();

import {
    renderIndex,
    renderStaff,
    renderCarnet,
    renderTemplate
} from '../controllers/index.controller'

// EndPoint : /
router.get('/', renderIndex);
router.get('/staff', renderStaff);
router.get('/carnet', renderCarnet);
router.get('/template', renderTemplate);

// EndPoint : /api/rac/:id 

export default router