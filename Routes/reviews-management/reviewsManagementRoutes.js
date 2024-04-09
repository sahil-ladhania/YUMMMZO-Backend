import express from 'express';
const router = express.Router();

// ------Defining Reviews Management Routes------
// For Creating a Review
router.post('/api/v1/user/reviews'); 
// For Updating a specific Review
router.put('/api/v1/user/update-review/:review_id');
// For Deleting a specific Review
router.delete('/api/v1/user/delete-review/:review_id');
// For Getting all Reviews for a Restaurant
router.get('/api/v1/user/reviews/restaurant/:restaurant_id');
// For Getting all Reviews for a specific User
router.get('/api/v1/user/reviews/user/:user_id');
// For Getting a specific Review
router.get('/api/v1/user/reviews/:review_id');

export default router;