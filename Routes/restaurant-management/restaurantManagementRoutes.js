import express from 'express';
import { createRestaurant, deleteRestaurant, getAllRestaurants, getSpecificRestaurant, updateRestaurant } from '../../Controllers/restaurant-management/restaurantManagementController.js';
const router = express.Router();

// ------Defining Restaurant Management Routes------
// For Creating a Restaurant
router.post('/api/v1/owner/create-restaurant' , createRestaurant); 
// For Updating a Restaurant
router.put('/api/v1/owner/update-restaurant/:restaurant_id' , updateRestaurant);
// For Deleting a Restaurant
router.delete('/api/v1/delete-restaurant/:restaurant_id' , deleteRestaurant);
// For Getting all Restaurants
router.get('/api/v1/restaurants' , getAllRestaurants);
// For Getting a specific Restaurant
router.get('/api/v1/restaurant/:restaurant_id' , getSpecificRestaurant);

export default router;