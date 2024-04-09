import express from 'express';
const router = express.Router();

// ------Defining Comments Management Routes------
// For Commenting to a Review
router.post('/api/v1/user/review/comments'); 
// For Updating a Comment
router.put('/api/v1/user/update-comment/:comment_id');
// For Deleting a Comment
router.delete('/api/v1/user/delete-comment/:comment_id');
// For Getting all Comments to a Review
router.get('/api/v1/user/comments/:review_id');
// For Getting a specific Comment to a Review by a User
router.get('/api/v1/user/comment/:comment_id/:review_id/:user_id');
// For Getting a specific Comment to a Review for a specififc Restaurant
router.get('/api/v1/user/comment/:comment_id/:review_id/:restaurant_id');

export default router;