// src/models/notes.model.ts
import { Note } from '../types';

class NotesModel {
  private notes: Note[] = [];
  private currentId = 1;

  constructor() {
    // Notas por defecto
    const defaultNotes: Omit<Note, 'id' | 'created_at'>[] = [
      { content: 'Me gustaria hablar más contigo, pero esta bien de vez en cuando también' },
      { content: 'Hecho por stivens, netlify para frontend y render para el backend xd' },
      { content: 'Básicamente, puedes hacer lo que quieras en esta app' },
      { content: 'Intentaré que no se quede suspendida esta app, por eso estaré agregando cumplidos diario con fe no se borra' },
      { content: 'Este es un proyecto donde le puse muchas ganas...' }
    ];

    defaultNotes.forEach(n => {
      this.notes.push({
        id: this.currentId++,
        content: n.content,
        created_at: new Date()
      });
    });
  }

  async create(note: Note): Promise<number> {
    const newNote: Note = {
      id: this.currentId++,
      content: note.content,
      created_at: new Date()
    };
    this.notes.push(newNote);
    return newNote.id!;
  }

  async findAll(): Promise<Note[]> {
    return [...this.notes].sort((a, b) => (b.created_at!.getTime() - a.created_at!.getTime()));
  }

  async findById(id: number): Promise<Note | null> {
    const note = this.notes.find(n => n.id === id);
    return note || null;
  }

  async update(id: number, note: Note): Promise<boolean> {
    const index = this.notes.findIndex(n => n.id === id);
    if (index === -1) return false;
    this.notes[index] = {
      ...this.notes[index],
      content: note.content
    };
    return true;
  }

  async delete(id: number): Promise<boolean> {
    const index = this.notes.findIndex(n => n.id === id);
    if (index === -1) return false;
    this.notes.splice(index, 1);
    return true;
  }
}

export default new NotesModel();
