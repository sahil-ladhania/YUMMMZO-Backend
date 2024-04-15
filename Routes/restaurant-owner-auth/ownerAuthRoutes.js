import express from 'express';
import { changePassword, getAllOwners, getSpecificOwner, ownerLogin, ownerSignup } from '../../Controllers/restaurant-owner-auth/ownerAuthController.js';
const router = express.Router();

// ------Defining Owner Auth Routes------
// For Owner Signup
router.post('/api/v1/owner/signup' , ownerSignup); 
// For Owner Login
router.post('/api/v1/owner/login' , ownerLogin);
// For Getting all Owner
router.get('/api/v1/owners' , getAllOwners);
// For Getting a specific Owner
router.get('/api/v1/owners/:owner_id' , getSpecificOwner);
// For Updating Password
router.put('/api/v1/owner/change-password/:owner_id' , changePassword);

export default router;