import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import personnelRoutes from './routes/personnelRoutes.js';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/personnel', personnelRoutes);

// System Status Check
app.get('/api/status', (req, res) => {
  res.json({
    status: 'OPERATIONAL',
    version: '2.4.0-STABLE',
    region: 'GLOBAL-INDUSTRIAL',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`[STAFFIO_KERNEL] Server running on node: http://localhost:${PORT}`);
});

export { prisma };
