import {
    Router
} from 'express'
const router = Router();

import {
    createUser,
    getUsers,
    updateUser,
    deleteUser
} from '../controllers/user.controller'


// EndPoint : /api/users
router.post('/', createUser);
router.get('/', getUsers);

// EndPoint : /api/users/:id
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;