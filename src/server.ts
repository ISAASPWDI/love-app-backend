// src/server.ts - Debug version
import app from './app';
import SERVER_CONFIG from './config/server.config';

console.log('🚀 Starting the server...');
console.log('📊 Environment variables:');
console.log('  - NODE_ENV:', process.env.NODE_ENV);
console.log('  - PORT from process.env:', process.env.PORT);
console.log('  - SERVER_CONFIG.PORT:', SERVER_CONFIG.PORT);
console.log('  - SERVER_CONFIG object:', SERVER_CONFIG);

// Use the PORT environment variable or default to 3000
const port = Number(process.env.PORT || SERVER_CONFIG.PORT || 3000);

console.log(`🎯 Final port selected: ${port}`);
console.log(`🌐 Attempting to bind to host: 0.0.0.0, port: ${port}`);

// Check if app is properly initialized
console.log('📱 App object:', typeof app);
console.log('📱 App listen method:', typeof app.listen);

// Start the server
const server = app.listen(port, '0.0.0.0', () => {
  console.log('✅ SERVER SUCCESSFULLY STARTED!');
  console.log(`🚀 Server running in ${SERVER_CONFIG.NODE_ENV} mode`);
  console.log(`🌍 Server listening on host: 0.0.0.0`);
  console.log(`🔌 Server listening on port: ${port}`);
  console.log(`📡 Full URL: http://0.0.0.0:${port}`);
});

// Add error handling for server startup
server.on('error', (error: any) => {
  console.error('❌ SERVER ERROR during startup:');
  console.error('Error code:', error.code);
  console.error('Error message:', error.message);
  console.error('Full error:', error);
  
  if (error.code === 'EADDRINUSE') {
    console.error(`🚫 Port ${port} is already in use!`);
  }
  
  process.exit(1);
});

server.on('listening', () => {
  const address = server.address();
  console.log('👂 Server listening event fired!');
  console.log('📍 Server address info:', address);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.log('💥 UNHANDLED REJECTION! Shutting down...');
  console.error('Rejection name:', err.name);
  console.error('Rejection message:', err.message);
  console.error('Full rejection:', err);
  
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('🔚 Process terminated!');
  });
});

// Additional debugging
console.log('🔍 Process info:');
console.log('  - Process PID:', process.pid);
console.log('  - Node version:', process.version);
console.log('  - Platform:', process.platform);

export default server;