import express from 'express';
const router = express.Router();

// ------Defining User Auth Routes------
// For User Signup
router.post('/api/v1/user/signup'); 
// For User Login
router.post('/api/v1/user/login');
// For Getting all Users
router.get('/api/v1/users');
// For Getting a specific User
router.get('/api/v1/users/:user_id');

export default router;