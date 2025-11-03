const projectStore = require('../utils/projectStore');
const excelService = require('../utils/excelService');

const getSummary = async (req, res) => {
  const projects = projectStore.readProjects();
  const inquiries = await excelService.readInquiries();
  const totalAppointments = inquiries.filter((item) => item.type === 'Appointment').length;
  const totalInquiries = inquiries.filter((item) => item.type === 'Inquiry').length;

  res.json({
    totalProjects: projects.length,
    totalAppointments,
    totalInquiries
  });
};

module.exports = {
  getSummary
};
