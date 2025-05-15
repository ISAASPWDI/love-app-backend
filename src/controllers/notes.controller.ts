import { Request, Response } from 'express';
import NotesModel from '../models/notes.model';
import { Note } from '../types';

export async function createNote(req: Request, res: Response): Promise<void> {
  try {
    const note: Note = req.body;
    if (!note.content) {
      res.status(400).json({ message: 'Note content is required' });
      return;
    }

    const id = await NotesModel.create(note);
    const createdNote = await NotesModel.findById(id);
    res.status(201).json(createdNote);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ message: 'Error creating note', error });
  }
}

export async function getAllNotes(req: Request, res: Response) {
  try {
    const notes = await NotesModel.findAll();
    res.status(200).json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Error fetching notes', error });
  }
}

export async function getNoteById(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id);
    const note = await NotesModel.findById(id);
    
    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }
    
    res.status(200).json(note);
  } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).json({ message: 'Error fetching note', error });
  }
}

export async function updateNote(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id);
    const note: Note = req.body;
    
    if (!note.content) {
      res.status(400).json({ message: 'Note content is required' });
      return;
    }
    
    const noteExists = await NotesModel.findById(id);
    if (!noteExists) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }
    
    await NotesModel.update(id, note);
    const updatedNote = await NotesModel.findById(id);
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ message: 'Error updating note', error });
  }
}

export async function deleteNote(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id);
    
    const noteExists = await NotesModel.findById(id);
    if (!noteExists) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }
    
    await NotesModel.delete(id);
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Error deleting note', error });
  }
}
