import express from 'express';
const router = express.Router();

// ------Defining Comment Reply Management Routes------
// For Replying to a Comment
router.post('/api/v1/user/reply'); 
// For Updating a Reply
router.put('/api/v1/user/update-reply/:reply_id/:comment_id');
// For Deleting a Reply
router.delete('/api/v1/user/delete-reply/:reply_id/:comment_id');
// For Getting all Replies to a Comment
router.get('/api/v1/user/replies/:comment_id');
// For Getting a specific Reply to a Comment
router.get('/api/v1/user/reply/:reply_id/:comment_id');

export default router;