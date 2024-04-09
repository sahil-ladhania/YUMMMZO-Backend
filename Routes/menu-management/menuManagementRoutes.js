import express from 'express';
const router = express.Router();

// ------Defining Menu Management Routes------
// For Creating a New Menu Item
router.post('/api/v1/restaurants/:restaurant_id/create-menu-item'); 
// For Updating a Menu Item
router.put('/api/v1/restaurants/:restaurant_id/update-menu-item/:menuItem_id');
// For Deleting a Menu Item
router.delete('/api/v1/restaurants/:restaurant_id/delete-menu-item/:menuItem_id');
// For Getting all Menu Items
router.get('/api/v1/restaurants/:restaurant_id/menu');
// For Getting a specific Menu Item
router.get('/api/v1/restaurant/:restaurant_id/menu/:menuItem_id');

export default router;