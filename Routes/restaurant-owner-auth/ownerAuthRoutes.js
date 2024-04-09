import express from 'express';
const router = express.Router();

// ------Defining Owner Auth Routes------
// For Owner Signup
router.post('/api/v1/owner/signup'); 
// For Owner Login
router.post('/api/v1/owner/login');
// For Getting all Owner
router.get('/api/v1/owners');
// For Getting a specific Owner
router.get('/api/v1/owners/:owner_id');

export default router;