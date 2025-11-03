const fs = require('fs');
const ExcelJS = require('exceljs');
const config = require('../config');

const ensureWorkbook = async () => {
  const fileExists = fs.existsSync(config.excelFilePath);
  const workbook = new ExcelJS.Workbook();

  if (fileExists) {
    await workbook.xlsx.readFile(config.excelFilePath);
  } else {
    const inquiriesSheet = workbook.addWorksheet('Inquiries');
    inquiriesSheet.columns = [
      { header: 'Timestamp', key: 'timestamp', width: 25 },
      { header: 'Type', key: 'type', width: 15 },
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Phone', key: 'phone', width: 18 },
      { header: 'Preferred Slot', key: 'slot', width: 25 },
      { header: 'Message', key: 'message', width: 40 }
    ];
    await workbook.xlsx.writeFile(config.excelFilePath);
    return ensureWorkbook();
  }

  return workbook;
};

const appendInquiry = async (payload) => {
  const workbook = await ensureWorkbook();
  const sheet = workbook.getWorksheet('Inquiries') || workbook.addWorksheet('Inquiries');
  sheet.addRow({
    timestamp: new Date().toISOString(),
    type: payload.type,
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    slot: payload.slot || 'N/A',
    message: payload.message || ''
  });
  await workbook.xlsx.writeFile(config.excelFilePath);
};

const readInquiries = async () => {
  const workbook = await ensureWorkbook();
  const sheet = workbook.getWorksheet('Inquiries');
  if (!sheet) return [];
  const rows = [];
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    const [timestamp, type, name, email, phone, slot, message] = row.values.slice(1);
    rows.push({ timestamp, type, name, email, phone, slot, message });
  });
  return rows;
};

module.exports = {
  appendInquiry,
  readInquiries
};
