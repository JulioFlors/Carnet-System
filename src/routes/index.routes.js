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
router.get('/Staff', isAuthenticated, renderStaff);
router.get('/Carnet', isAuthenticated, renderCarnet);
router.get('/Template', isAuthenticated, renderTemplate);

// EndPoint : /api/rac/:id 

export default router