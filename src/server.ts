// src/server.ts - Updated version
import app from './app';
import SERVER_CONFIG from './config/server.config';

console.log('Starting the server...'); 

// Use the PORT environment variable or default to 3000
// This is important for platforms like Render that provide their own PORT
const port = Number(process.env.PORT || SERVER_CONFIG.PORT || 3000);

console.log(`Attempting to bind to port ${port}`);

// Start the server
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server running in ${SERVER_CONFIG.NODE_ENV} mode on port ${port}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. 👋 Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated!');
  });
});