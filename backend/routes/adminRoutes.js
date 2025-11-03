const { Router } = require('express');
const authenticate = require('../middleware/authMiddleware');
const { getSummary } = require('../controllers/adminController');
const { listInquiries } = require('../controllers/engagementController');

const router = Router();

router.get('/summary', authenticate, getSummary);
router.get('/inquiries', authenticate, listInquiries);

module.exports = router;
