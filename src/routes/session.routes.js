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

// EndPoint : localhost:4000/signup 
router.post('/signup', isAuthenticated, signUp);

router.get('/signup', isAuthenticated, renderSignUpForm);

// EndPoint : localhost:4000/signin 
router.post('/signin', signIn);

router.get('/signin', renderSignInForm);

// EndPoint : localhost:4000/logout 
router.get('/logout', isAuthenticated, logout);

export default router;