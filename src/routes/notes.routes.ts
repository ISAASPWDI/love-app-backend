  import { Router } from 'express';
  import { 
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
  } from '../controllers/notes.controller';

  const router = Router();

  // Routes for notes (con funciones directas)
  router.route('/')
    .get(getAllNotes)
    .post(createNote);

  router.route('/:id')
    .get(getNoteById)
    .put(updateNote)
    .delete(deleteNote);

  export default router;
