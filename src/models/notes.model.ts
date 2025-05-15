// src/models/notes.model.ts
import { Note } from '../types';

class NotesModel {
  private notes: Note[] = [];
  private currentId = 1;

  async create(note: Note): Promise<number> {
    const newNote: Note = {
      id: this.currentId++,
      content: note.content,
      created_at: new Date() // Se asegura tipo Date correcto
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
      // mantenemos created_at igual
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
