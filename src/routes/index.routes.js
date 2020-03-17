import {
    Router
} from 'express'

const router = Router();

import {
    isAuthenticated
} from '../helpers/auth'

import {
    renderIndex,
    renderStaff,
    renderCarnet,
    renderTemplate
} from '../controllers/index.controller'

// EndPoint : /
router.get('/', isAuthenticated, renderIndex);
router.get('/staff', isAuthenticated, renderStaff);
router.get('/carnet', isAuthenticated, renderCarnet);
router.get('/template', isAuthenticated, renderTemplate);

// EndPoint : /api/rac/:id 

export default router