import express from 'express';
import { changePassword, getAllUsers, getSpecificUser, userLogin, userSignup } from '../../Controllers/user-auth/userAuthController.js';
import { isAuthorized } from '../../Middlewares/AuthZ-Middleware/isAuthorized.js';
const router = express.Router();

// ------Defining User Auth Routes------
// For User Signup
router.post('/api/v1/user/signup' , userSignup); 
// For User Login
router.post('/api/v1/user/login' , userLogin);
// For Getting all Users
router.get('/api/v1/users' , isAuthorized ,  getAllUsers);
// For Getting a specific User
router.get('/api/v1/users/:user_id' , isAuthorized , getSpecificUser);
// For Updating Password
router.put('/api/v1/user/change-password/:user_id' , isAuthorized , changePassword);

export default router;