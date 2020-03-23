import {
    Router
} from 'express'

const router = Router();

import {
    isAuthenticated
} from '../helpers/auth'

import {
    getAllStaff
} from '../controllers/staff.controller'

// Get All Staff
router.get('/staff', isAuthenticated, getAllStaff);

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