import express from 'express';
const router = express.Router();

// ------Defining Cart Management Routes------
// For Adding item in the Cart
router.post('/api/v1/cart/add-item/:user_id/:restaurant_id/:menuItem_id'); 
// For Incrementing item in the Cart
router.post('/api/v1/cart/increment-quantity/:user_id/:restaurant_id/:menuItem_id');
// For Decrementing item in the Cart
router.post('/api/v1/cart/decrement-quantity/:user_id/:restaurant_id/:menuItem_id');
// For Getting all Cart Items for a User
router.get('/api/v1/cart/:user_id');

export default router;