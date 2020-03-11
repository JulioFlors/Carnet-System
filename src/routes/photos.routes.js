import {
    Router
} from 'express';

const router = Router();

import {
    uploadPhoto,
    getPhoto,
    deletePhoto
} from '../controllers/photo.controller'

// EndPoint : /api/photos 
router.post('/upload', uploadPhoto);

// EndPoint : /api/photos/:id 
router.get('/:id', getPhoto);
router.delete('/:id', deletePhoto);

export default router;