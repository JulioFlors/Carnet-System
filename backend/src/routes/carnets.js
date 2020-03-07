import {
    Router
} from 'express'

const router = Router();

import {
    // createCarnet,
    getCarnets //,
    // updateCarnet,
    // deleteCarnet
} from '../controllers/carnet.controller'


// // EndPoint : /api/carnets
// router.post('/', createCarnet);
router.get('/', getCarnets);

// // EndPoint : /api/carnets/:id
// router.put('/:id', updateCarnet);
// router.delete('/:id', deleteCarnet);

export default router;