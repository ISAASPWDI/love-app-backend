// src/config/db.config.ts
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

console.log('🔍 Database Configuration Debug:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DB_PASSWORD exists:', !!process.env.DB_PASSWORD);

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || '5432'),
  
  // SSL siempre activo para Supabase
  ssl: {
    rejectUnauthorized: false
  },
  
  // Configuraciones optimizadas para conexiones externas
  max: 10, // máximo número de conexiones en el pool
  idleTimeoutMillis: 30000, // tiempo antes de cerrar conexiones inactivas
  connectionTimeoutMillis: 10000, // aumentado para conexiones lentas
  acquireTimeoutMillis: 60000, // tiempo máximo para obtener una conexión
  
  // Configuraciones adicionales para estabilidad
  statement_timeout: 30000,
  query_timeout: 30000,
  
  // Configuraciones específicas para evitar problemas de red
  keepAlive: true,
  keepAliveInitialDelayMillis: 10000,
};

console.log('📊 Final DB Config:', {
  ...dbConfig,
  password: dbConfig.password ? '[HIDDEN]' : 'NOT_SET'
});

const pool = new Pool(dbConfig);

// Manejo de eventos del pool con más detalles
pool.on('connect', (client) => {
  console.log('✅ Connected to PostgreSQL database');
  console.log('Connection info:', {
    host: client.host,
    port: client.port,
    database: client.database
  });
});

pool.on('acquire', () => {
  console.log('🔗 Client acquired from pool');
});

pool.on('release', () => {
  console.log('🔓 Client released back to pool');
});

pool.on('error', (err: Error) => {
  console.error('❌ Unexpected error on idle client:', err);
  console.error('Error details:', {
    name: err.name,
    message: err.message,
    stack: err.stack
  });
  // No cerrar el proceso inmediatamente
  console.log('Continuing with degraded database connectivity...');
});

// Función de prueba de conexión
export const testConnection = async (): Promise<boolean> => {
  try {
    console.log('🧪 Testing database connection...');
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    console.log('✅ Database connection test successful:', result.rows[0]);
    client.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection test failed:', error);
    return false;
  }
};

// Ejecutar prueba de conexión al inicializar
testConnection();

export default pool;