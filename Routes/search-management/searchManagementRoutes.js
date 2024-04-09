import express from 'express';
const router = express.Router();

// ------Defining Search Management Routes------
// For Searching Restaurants
router.post('/api/v1/search/restaurants/:query'); 
// For Searching Cuisines
router.post('/api/v1/search/cuisines/:query');
// For Searching Menu Items in a Menu
router.get('/api/v1/restaurants/:restaurant_id/menu-items/search/:query');

export default router;