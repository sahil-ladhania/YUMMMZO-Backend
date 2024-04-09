import express from 'express';
const router = express.Router();

// ------Defining Cuisine Management Routes------
// For Creating a Cuisine
router.post('/api/v1/create-cuisine'); 
// For Updating a Cuisine
router.put('/api/v1/user/update-cuisine/:cuisine_id');
// For Deleting a Cuisine
router.put('/api/v1/user/delete-cuisine/:cuisine_id');
// For Getting all Cuisines
router.put('/api/v1/cuisines');
// For Getting a specific Cuisine
router.get('/api/v1/cuisine/:cuisine_id');

export default router;