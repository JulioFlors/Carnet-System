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


// // Vista para buscar el STAFF
// router.get("/carnet/staff/search", isAuthenticated, renderFormCarnet);

// Obtine desde view la cedula (consulta la DB) y Envia los datos del STAFF de vuelta a view
router.post('/carnet/staff/view', isAuthenticated, getData);

// Vista del Form y del Carnet
router.get("/carnet/staff/view", isAuthenticated, renderFormCarnet);

// Enviar datos del Form de carnet-staff para crear el carnet, guardar foto, imprimir
router.post("/carnet/staff/uploadPhoto", isAuthenticated, uploadPhoto);



// // Get All Staff
// router.get('/carnet/staff', isAuthenticated, getCarnet);

// // New Staff
// router.get('/staff/add', isAuthenticated, renderNewStaff);

// router.post('/staff/new-staff', isAuthenticated, createStaff);

// // Edit Staff
// router.get("/staff/edit/:id", isAuthenticated, renderEditForm);

// // Update Staff
// router.put("/staff/edit/:id", isAuthenticated, updateStaff);

// // Delete staff
// router.delete("/staff/delete/:id", isAuthenticated, deletStaff);

export default router