import {
    Router
} from 'express'

const router = Router();

import {
    isAuthenticated
} from '../helpers/auth'

import {
    getData,
    uploadPhoto,
    createCarnet,
    renderFormCarnet
} from '../controllers/carnet.controller'

// Obtine desde view la cedula (consulta la DB) y Envia los datos del STAFF de vuelta a view
router.post('/carnet/staff', isAuthenticated, getData);

// Vista del Form y del Carnet
router.get("/carnet/staff", isAuthenticated, renderFormCarnet);

// guardar foto
router.post("/carnet/uploadPhoto", isAuthenticated, uploadPhoto);

// crea o actualiza el carnet
router.post("/carnet/createCarnet", isAuthenticated, createCarnet);

export default router