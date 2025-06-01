// src/config/db.config.ts
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

console.log('🔍 Database Configuration Debug (Transaction Pooler):');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DB_PASSWORD exists:', !!process.env.DB_PASSWORD);

// Usar connection string si está disponible, sino usar parámetros individuales
const useConnectionString = !!process.env.DATABASE_URL;

console.log('🔗 Using connection method:', useConnectionString ? 'CONNECTION_STRING' : 'INDIVIDUAL_PARAMS');
console.log('🌐 Using Supabase Transaction Pooler (IPv4 compatible)');

let dbConfig: any;

if (useConnectionString) {
  console.log('📡 Using DATABASE_URL connection string with Transaction Pooler');
  dbConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    },
    // Configuración optimizada para Transaction Pooler
    max: 5, // Menor número de conexiones ya que el pooler maneja esto
    min: 1, // Mantener al menos una conexión
    idleTimeoutMillis: 10000, // Menor tiempo idle para pooler
    connectionTimeoutMillis: 15000, // Más tiempo para establecer conexión
    acquireTimeoutMillis: 30000, // Tiempo para obtener conexión del pool
    statement_timeout: 60000, // Más tiempo para queries complejas
    query_timeout: 60000,
    keepAlive: true,
    keepAliveInitialDelayMillis: 0,
    // Configuraciones específicas para Transaction Pooler
    application_name: 'nodejs_app',
    // Forzar IPv4
    family: 4,
  };
} else {
  console.log('📊 Using individual database parameters with Transaction Pooler');
  dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || '6543'), // Puerto del pooler por defecto
    
    // SSL siempre activo para Supabase
    ssl: {
      rejectUnauthorized: false
    },
    
    // Configuración optimizada para Transaction Pooler
    max: 5, // Menor número de conexiones ya que el pooler maneja esto
    min: 1, // Mantener al menos una conexión
    idleTimeoutMillis: 10000, // Menor tiempo idle para pooler
    connectionTimeoutMillis: 15000, // Más tiempo para establecer conexión
    acquireTimeoutMillis: 30000, // Tiempo para obtener conexión del pool
    statement_timeout: 60000, // Más tiempo para queries complejas
    query_timeout: 60000,
    keepAlive: true,
    keepAliveInitialDelayMillis: 0,
    // Configuraciones específicas para Transaction Pooler
    application_name: 'nodejs_app',
    // Forzar IPv4
    family: 4,
  };
}

console.log('📊 Final DB Config (Transaction Pooler):', {
  ...dbConfig,
  password: dbConfig.password ? '[HIDDEN]' : 'NOT_SET',
  connectionString: dbConfig.connectionString ? '[HIDDEN]' : 'NOT_SET',
  poolerMode: 'transaction',
  ipVersion: 'IPv4'
});

const pool = new Pool(dbConfig);

// Manejo de eventos del pool con más detalles
pool.on('connect', (client) => {
  console.log('✅ Connected to PostgreSQL via Transaction Pooler');
  console.log('🌐 IPv4 Connection established');
  console.log('Connection info:', {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    pooler: 'transaction'
  });
});

pool.on('acquire', () => {
  console.log('🔗 Client acquired from Transaction Pooler');
});

pool.on('release', () => {
  console.log('🔓 Client released back to Transaction Pooler');
});

pool.on('error', (err: Error) => {
  console.error('❌ Unexpected error on Transaction Pooler client:', err);
  console.error('Error details:', {
    name: err.name,
    message: err.message,
    code: (err as any).code,
    errno: (err as any).errno,
    address: (err as any).address,
    port: (err as any).port
  });
  
  // Información adicional para debugging
  if ((err as any).code === 'ENETUNREACH') {
    console.error('🚨 Network unreachable - checking IPv4/IPv6 compatibility');
    console.error('Current pooler config should resolve this issue');
  }
  
  console.log('Continuing with degraded database connectivity...');
});

// Función de prueba de conexión mejorada
export const testConnection = async (): Promise<boolean> => {
  try {
    console.log('🧪 Testing Transaction Pooler connection...');
    console.log('🌐 Using IPv4 compatible pooler');
    
    const client = await pool.connect();
    const result = await client.query('SELECT NOW(), version()');
    
    console.log('✅ Transaction Pooler connection test successful!');
    console.log('📅 Server time:', result.rows[0].now);
    console.log('🐘 PostgreSQL version:', result.rows[0].version.split(' ')[0]);
    console.log('🔗 Pooler mode: Transaction');
    console.log('🌐 IP version: IPv4');
    
    client.release();
    return true;
  } catch (error) {
    console.error('❌ Transaction Pooler connection test failed:', error);
    console.error('🔍 Error analysis:');
    
    if ((error as any).code === 'ENETUNREACH') {
      console.error('  - Network unreachable (should be resolved with pooler)');
    } else if ((error as any).code === 'ECONNREFUSED') {
      console.error('  - Connection refused');
    } else if ((error as any).code === 'ETIMEDOUT') {
      console.error('  - Connection timeout');
    }
    
    console.error('  - Address:', (error as any).address);
    console.error('  - Port:', (error as any).port);
    
    return false;
  }
};

// Función para estadísticas del pool
export const getPoolStats = () => {
  return {
    totalCount: pool.totalCount,
    idleCount: pool.idleCount,
    waitingCount: pool.waitingCount
  };
};

// Ejecutar prueba de conexión al inicializar
testConnection().then(success => {
  if (success) {
    console.log('🎉 Database ready with Transaction Pooler!');
  } else {
    console.log('⚠️ Database connection issues detected');
  }
});

export default pool;