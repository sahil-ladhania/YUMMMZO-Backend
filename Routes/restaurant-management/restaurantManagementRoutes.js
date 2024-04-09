import express from 'express';
const router = express.Router();

// ------Defining Restaurant Management Routes------
// For Creating a Restaurant
router.post('/api/v1/created-restaurant'); 
// For Updating a Restaurant
router.put('/api/v1/update-restaurant/:restaurant_id');
// For Deleting a Restaurant
router.delete('/api/v1/delete-restaurant/:restaurant_id');
// For Getting all Restaurants
router.get('/api/v1/restaurants');
// For Getting a specific Restaurant
router.get('/api/v1/restaurant/:restaurant_id');

export default router;