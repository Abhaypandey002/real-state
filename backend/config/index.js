const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

const config = {
  port: process.env.PORT || 5000,
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
  jwtSecret: process.env.JWT_SECRET || 'dreamnest-secret',
  excelFilePath: path.resolve(__dirname, '..', 'excel', 'customer_inquiries.xlsx'),
  projectStorePath: path.resolve(__dirname, '..', 'data', 'projects.json')
};

module.exports = config;
