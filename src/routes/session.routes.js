import {
    Router
} from 'express'

const router = Router();

import {
    signUp,
    signIn,
    logout,
    renderSignInForm,
    renderSignUpForm
} from '../controllers/session.controller'

// EndPoint : localhost:4000/signup 
router.post('/signup', signUp);

router.get('/signup', renderSignUpForm);

// EndPoint : localhost:4000/signin 
router.post('/signin', signIn);

router.get('/signin', renderSignInForm);

// EndPoint : localhost:4000/logout 
router.get('/logout', logout);

export default router;