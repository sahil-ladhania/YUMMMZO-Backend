import express from 'express';
import { getAllUsers, getSpecificUser, userLogin, userSignup } from '../../Controllers/user-auth/userAuthController.js';
const router = express.Router();

// ------Defining User Auth Routes------
// For User Signup
router.post('/api/v1/user/signup' , userSignup); 
// For User Login
router.post('/api/v1/user/login' , userLogin);
// For Getting all Users
router.get('/api/v1/users' , getAllUsers);
// For Getting a specific User
router.get('/api/v1/users/:user_id' , getSpecificUser);

export default router;