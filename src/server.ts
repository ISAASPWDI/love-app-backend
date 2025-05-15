// src/server.ts
import app from './app';
import SERVER_CONFIG from './config/server.config';

console.log('Starting the server...'); 

const port = Number(SERVER_CONFIG.PORT);

// Start the server
const server = app.listen(port, () => {
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
