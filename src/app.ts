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

// Middleware para manejar JSON y formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de CORS (si la necesitas)
app.use(cors());

// Rutas
app.use('/api/memories', memoryRoutes);
app.use('/api/compliments', complimentRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/notes', notesRoutes);


// Ruta de prueba (opcional, para verificar que el servidor está corriendo)
app.get('/', (req, res) => {
  res.send('Server is running!');
});
// app.all('*', (req: Request, res: Response, next: NextFunction) => {
//   next(new CustomError(`Can't find ${req.originalUrl} on this server!`, 404));
// });
// Middleware de manejo de errores (si ocurre algún error en las rutas)
app.use(errorHandler);

export default app;
