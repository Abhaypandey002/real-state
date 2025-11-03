const excelService = require('../utils/excelService');

const bookAppointment = async (req, res) => {
  const { name, email, phone, preferredSlot, message } = req.body;
  if (!name || !email || !phone || !preferredSlot) {
    return res.status(400).json({ message: 'Name, email, phone, and preferred slot are required.' });
  }

  await excelService.appendInquiry({
    type: 'Appointment',
    name,
    email,
    phone,
    slot: preferredSlot,
    message
  });

  res.status(201).json({ message: 'Appointment booked successfully!' });
};

const submitInquiry = async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required.' });
  }

  await excelService.appendInquiry({
    type: 'Inquiry',
    name,
    email,
    phone: phone || 'N/A',
    message
  });

  res.status(201).json({ message: 'Inquiry submitted successfully!' });
};

const listInquiries = async (req, res) => {
  const inquiries = await excelService.readInquiries();
  res.json(inquiries);
};

module.exports = {
  bookAppointment,
  submitInquiry,
  listInquiries
};
