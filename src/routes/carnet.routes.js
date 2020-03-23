import {
    Router
} from 'express'

const router = Router();

import {
    isAuthenticated
} from '../helpers/auth'

import {
    getStaff,
    createCarnet,
    renderFormCarnet
} from '../controllers/carnet.controller'


// // Vista para buscar el STAFF
// router.get("/carnet/staff/search", isAuthenticated, renderFormCarnet);

// Obtine y Envia los datos del STAFF al Form de carnet-staff
router.post('/carnet/staff/search', isAuthenticated, getStaff);

// Vista del Form y del Carnet
router.get("/carnet/staff/view", isAuthenticated, renderFormCarnet);

// Enviar datos del Form de carnet-staff a esta URL
router.post("/carnet/staff/new-carnet", isAuthenticated, createCarnet);



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