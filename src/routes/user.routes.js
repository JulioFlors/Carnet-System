import {
    Router
} from 'express'

const router = Router();

import {
    isAuthenticated
} from '../helpers/auth'

import {
    updateUser,
    renderEdit,
    deleteUser,
    renderUsers
} from '../controllers/user.controller'

// Get All Users
router.get('/users', isAuthenticated, renderUsers);

// Update User 
router.get('/users/edit/:id', isAuthenticated, renderEdit);
router.put('/users/update/:id', isAuthenticated, updateUser);

// Delete User
router.delete('/users/delete/:id', isAuthenticated, deleteUser);

export default router