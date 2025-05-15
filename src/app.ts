import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import memoryRoutes from './routes/memories.routes'; 
import complimentRoutes from './routes/compliments.routes'; 
import quizRoutes from './routes/quiz.routes'; 
import timelineRoutes from './routes/timeline.routes'; 
import notesRoutes from './routes/notes.routes';
import { errorHandler, CustomError } from './utils/error-handler';

const app = express();

// Configuración de CORS segura
const allowedOrigins = [
  'https://special-app-fy2.netlify.app',
  'http://localhost:3000' // Para desarrollo local
];

const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Permitir solicitudes sin origen (como aplicaciones móviles o solicitudes curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 200 // Para navegadores antiguos
};

// Aplicar CORS a todas las rutas
app.use(cors(corsOptions));

// Manejar solicitudes preflight para todas las rutas
app.options('*', cors(corsOptions));

// Middleware para logging de solicitudes (útil para debug)
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - Origin: ${req.headers.origin}`);
  next();
});

// Middleware para manejar JSON y formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas de la API
app.use('/api/memories', memoryRoutes);
app.use('/api/compliments', complimentRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/notes', notesRoutes);

// Ruta de prueba para verificar CORS
app.get('/api/test-cors', (req: Request, res: Response) => {
  res.json({ 
    message: 'CORS test successful',
    origin: req.headers.origin,
    status: 'Allowed' 
  });
});

// Ruta raíz
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running!');
});

// Middleware para rutas no encontradas
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(`Route not found: ${req.originalUrl}`, 404);
  next(error);
});

// Middleware de manejo de errores
app.use(errorHandler);

export default app;