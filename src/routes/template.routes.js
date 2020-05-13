import {
    Router
} from 'express'

const router = Router();

import {
    isAuthenticated
} from '../helpers/auth'

import {
    createTemplate,
    deleteTemplate,
    renderAddTemplate,
    renderTemplates
} from '../controllers/template.controller'

// Get All
router.get('/templates', isAuthenticated, renderTemplates);

// Create  
router.post('/templates/add', isAuthenticated, createTemplate);
router.get('/templates/add', isAuthenticated, renderAddTemplate);

// Delete
router.delete('/templates/delete/:id', isAuthenticated, deleteTemplate);

export default router