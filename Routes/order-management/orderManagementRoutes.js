import express from 'express';
const router = express.Router();

// ------Defining Order Management Routes------
// For Creating an Order
router.post('/api/v1/create-order/:user_id/:restaurant_id'); 
// For Getting all Orders for a User
router.get('/api/v1/orders/:user_id');
// For Getting a specific Order for a User
router.get('/api/v1/order/:order_id/:user_id');

export default router;