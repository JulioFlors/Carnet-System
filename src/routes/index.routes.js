import {
    Router
} from 'express'

const router = Router();

import {
    isAuthenticated
} from '../helpers/auth'

import { 
    renderCarnet,
    renderTemplate
} from '../controllers/index.controller'

// EndPoint : / 
router.get('/Carnet', isAuthenticated, renderCarnet);
router.get('/Template', isAuthenticated, renderTemplate);

// EndPoint : /api/rac/:id 

export default router