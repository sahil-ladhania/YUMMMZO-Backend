import express from 'express';
const router = express.Router();

// ------Defining Filter & Sort Management Routes------
// For Filtering Restaurants by Fast Delivery
router.get('/api/v1/restaurants/sort/by-fast-delivery'); 
// For Filtering Restaurants by High Rating
router.get('/api/v1/restaurants/sort/by-high-rating'); 
// For Filtering Restaurants by Cost Low to High
router.get('/api/v1/restaurants/sort/by-cost-low-to-high'); 
// For Filtering Restaurants by Cost High to Low
router.get('/api/v1/restaurants/sort/by-cost-high-to-low'); 

export default router;