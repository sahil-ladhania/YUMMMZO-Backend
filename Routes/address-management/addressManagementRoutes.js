import express from 'express';
const router = express.Router();

// ------Defining Address Management Routes------
// For Creating a User Address
router.post('/api/v1/create-user-address/:user_id'); 
// For Updating a User Address
router.put('/api/v1/update-user-address/:user_id/:address_id');
// For Deleting a User Address
router.delete('/api/v1/delete-user-address/:user_id/:address_id');
// For Getting all User Addresses
router.get('/api/v1/user-addresses/:user_id');
// For Getting a specific User Address
router.get('/api/v1/user-address/:user_id/:address_id');

export default router;