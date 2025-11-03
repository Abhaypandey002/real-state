const { Router } = require('express');
const authenticate = require('../middleware/authMiddleware');
const {
  bookAppointment,
  submitInquiry,
  listInquiries
} = require('../controllers/engagementController');

const router = Router();

router.post('/appointments', bookAppointment);
router.post('/contact', submitInquiry);
router.get('/inquiries', authenticate, listInquiries);

module.exports = router;
