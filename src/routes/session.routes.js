import {
    Router
} from 'express'

const router = Router();

import {
    isAuthenticated
} from '../helpers/auth'

import {
    signUp,
    signIn,
    logout,
    renderSignInForm,
    renderSignUpForm
} from '../controllers/session.controller'

// Signup 
router.post('/signup', isAuthenticated, signUp);
router.get('/users/add', isAuthenticated, renderSignUpForm);

// Signin 
router.post('/signin', signIn);
router.get('/signin', renderSignInForm);

// logout 
router.get('/logout', isAuthenticated, logout);

export default router;