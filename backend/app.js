const path = require('path');
const express = require('express');
const cors = require('cors');
const config = require('./config');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const engagementRoutes = require('./routes/engagementRoutes');
const adminRoutes = require('./routes/adminRoutes');
require('./utils/projectStore');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'DreamNest API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/engagement', engagementRoutes);
app.use('/api/admin', adminRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const startServer = () => {
  app.listen(config.port, () => {
    console.log(`DreamNest backend listening on port ${config.port}`);
  });
};

if (require.main === module) {
  startServer();
}

module.exports = app;
