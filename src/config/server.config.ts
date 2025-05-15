// src/config/server.config.ts
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const SERVER_CONFIG = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_PREFIX: '/api/v1',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
};

export default SERVER_CONFIG;